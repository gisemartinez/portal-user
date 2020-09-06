/**
 * Created by gmartinez on 12/4/17.
 */

let express = require('express'),
  router = express.Router(),
  request = require('request'),
  async = require('async'),
  DateFNS = require('date-fns'),
  jwt = require('jwt-simple');

const config = require('./config');
var models = require('./db/models');
let urls = require('./const');
let social_urls = require('../dist/out-tsc/src/app/constants/social_login_keys.const');

function createTokenRequest( body ){
  return {
    code: body.code,
    client_id: body.clientId,
    client_secret: social_urls.social_urls.facebook.secret,
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
    iat: DateFNS.getUnixTime(),
    exp: DateFNS.addDays(14).getUnixTime()
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
  request.post(
    urls.facebook.accessTokenUrl,
    {
      form: createTokenRequest(req.body)
    },
    function obtainAccessToken( err, response, token ){
      if ( err ){
        return res.status(500).send({ message: err });
      } else {
        req.token = token;
        return next();
      }
    });
}


// Step 2. Retrieve profile information about the current user.
function getPublicProfile( req, res, next ){

  request.get(
    urls.facebook.peopleApiUrl,
    {
      qs: {
        fields: 'email,family_name,gender,given_name,hd,id,link,locale,name,picture,verified_email'
      },
      headers: createHeaderWithToken(req.token)
    },
    function getUser( err, response, profile ){
      if ( err ){
        return res.status(500).send({ message: err });
      } else if ( profile.error ){
        return res.status(500).send({ message: profile.error });
      }
      req.consolidated_profile = JSON.parse(profile);
      return next();
    }
  );

}


//Step 3: Send data from profile to Admin
function sendProfileInfoToAdmin( req, res, next ){

  let profile = req.consolidated_profile;
  let url = config[ 'adminDashboard' ] + 'user/' + profile.email;

  request.get(
    url,
    function ( err, response, user_token ){
      if ( err ){
        createOneUser(req, res, next);
      } else {
        next();
      }

    }
  );
}

//Step 4: Send data to Radius
function persistUserInRadiusDB( req, res, next ){

  RadCheck.findOrCreate({
    where: {
      username: req.consolidated_profile.email,
      value: req.consolidated_profile.id
    }
  }).then(function ( model, result ){
    req.radius_result = model;
    next()

  });
}

router.post('/facebook',
  requestOauthToken,
  getPublicProfile,
  sendProfileInfoToAdmin,
  persistUserInRadiusDB,
  function ( req, res ){
    if ( req.radius_result ){
      res.send({ 'token': req.token });
    } else {
      res.send({ 'token': req.token })
    }
  });


module.exports = router;

