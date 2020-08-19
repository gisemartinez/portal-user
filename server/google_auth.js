let express = require('express'),
  router = express.Router(),
  request = require('request'),
  DateFNS = require('date-fns'),
  async = require('async'),
  google = require('googleapis');
  jwt = require('jwt-simple');

const config = require('./config');
const RadCheck = require('./db/models/radcheck');
let urls = require('./const');


function createTokenRequest( body ){
  return {
    code: body.code,
    client_id: config.socialMediaKeys.google.clientId,
    client_secret: config.socialMediaKeys.google.secret,
    redirect_uri: body.redirectUri,
    grant_type: 'authorization_code'
  }
}

function createHeaderWithToken( token ){
  let accessToken = JSON.parse(token).access_token;
  let headers = { 'authorization': 'Bearer ' + accessToken };
  return headers;
}

function ensureAuthenticated( req, res, next ){
  if ( !req.header('Authorization') ){
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  let token = req.header('Authorization').split(' ')[ 1 ];

  let payload = null;
  try {
    payload = jwt.decode(token, config[ 'TOKEN_SECRET' ]);
  }
  catch ( err ) {
    return res.status(401).send({ message: err.message });
  }

  if ( payload.exp <= DateFNS.getUnixTime() ){
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

function createJWT( user ){
  let payload = {
    sub: user._id,
    iat:  DateFNS.getUnixTime(),
    exp:  DateFNS.addDays(14).getUnixTime()
  };
  return jwt.encode(payload, config[ 'TOKEN_SECRET' ]);
}

function createOneUser( req, res, next ){
  request.post(
    config[ 'adminDashboard' ] + '/user',
    {
      json: true,
      body: req.profile
    },
    function ( err, response, user_token ){
      if ( err ){
        req.lostInfoForAdmin = true;
      }

      next();


    }
  );
}


// Step 1. Exchange authorization code for access token.
function requestOauthToken( req, res, next ){
  new Promise(function ( resolve, reject ){
  request.post(
    urls.google.accessTokenUrl,
    {
      form: createTokenRequest(req.body)
    },
    function obtainAccessToken( err, response, token ){
      if ( err ){
        reject(err);
      } else {
        resolve(req.token);
        req.token = token;
        next();
      }
    })
  });
}


// Step 2. Retrieve profile information about the current user.
function getPublicProfile( req, res, next ){
  return new Promise(function ( resolve,reject ){
    request.get(
      urls.google.peopleApiUrl,
      {
        qs: {
          personFields: 'names,emailAddresses,ageRanges,birthdays,genders,interests,residences'
        },
        headers: createHeaderWithToken(req.token)
      },
      function getUser( err, response, profile ){
        if ( err ){
          //return res.status(500).send({ message: err });
          reject(err);
        } else if ( profile.error ){
          //return res.status(500).send({ message: profile.error });
          reject(profile.err);
        }
        req.consolidated_profile = JSON.parse(profile);
        resolve(req.consolidated_profile);
        next();
      }
    )
  });
}


//Step 3: Send data from profile to Admin
function sendProfileInfoToAdmin( req, res, next ){
  return new Promise(function ( resolve,reject ){
    let profile = req.consolidated_profile;
    let url = config[ 'adminDashboard' ] + 'user/' + profile.email;

    request.get(
      url,
      function ( err, response, user_token ){
        if ( err ){
          createOneUser(req, res, next);
          resolve(err);
        } else {
          resolve();
          next();
        }

      }
    );
  })
}

//Step 4: Send data to Radius
function persistUserInRadiusDB( req, res, next ){
  return RadCheck.findOrCreate({
    where: {
      username: req.consolidated_profile.emailAddresses[0].value,
      value: req.consolidated_profile.etag
    }
  }).then(function ( model ){
    req.radius_result = model;
    return model;
  })
}

router.post('/google',
  requestOauthToken,
  getPublicProfile,
  sendProfileInfoToAdmin,
  function ( req, res ){
    persistUserInRadiusDB(req,res).then(result => {
      if ( result ){
        res.send({ 'username':req.consolidated_profile.email,'token': req.token });
      } else {
        res.status(503).send({ 'token': req.token })
      }}).catch(  err => {
        res.status(503).send({ 'error': err.stack })
    });
  });


module.exports = router;

