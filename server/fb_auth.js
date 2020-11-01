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
const RadCheck = require('./db/models/radcheck');
let urls = require('./const');

function createTokenRequest(body) {
  return {
    code: body.code,
    client_id: config.socialMediaKeys.facebook.clientId,
    client_secret: config.socialMediaKeys.facebook.secret,
    redirect_uri: body.redirectUri,
    grant_type: 'authorization_code'
  }
}

function createHeaderWithToken(token) {
  let accessToken = JSON.parse(token).access_token;
  let headers = {'authorization': 'Bearer ' + accessToken};
  return headers;
}

function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
  }
  let token = req.header('Authorization').split(' ')[1];

  let payload = null;
  try {
    payload = jwt.decode(token, config['TOKEN_SECRET']);
  } catch (err) {
    return res.status(401).send({message: err.message});
  }

  if (payload.exp <= DateFNS.getUnixTime()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  req.user = payload.sub;
  next();
}

function createJWT(user) {
  let payload = {
    sub: user._id,
    iat: DateFNS.getUnixTime(),
    exp: DateFNS.addDays(14).getUnixTime()
  };
  return jwt.encode(payload, config['TOKEN_SECRET']);
}

function createOneUser(req, res, next) {
  request.post(
    config['adminDashboard'] + '/user',
    {
      json: true,
      body: req.profile
    },
    function (err, response, user_token) {
      if (err) {
        req.lostInfoForAdmin = true;
      }
      next();
    }
  );
}


// Step 1. Exchange authorization code for access token.
function requestOauthToken(req, res, next) {
  new Promise(function (resolve, reject) {
    request.post(
      urls.facebook.accessTokenUrl,
      {
        form: createTokenRequest(req.body)
      },
      function obtainAccessToken(err, response, token) {
        if (err) {
          return res.status(500).send({message: err});
        } else {
          req.token = token;
          return next();
        }
      });
  })
}


// Step 2. Retrieve profile information about the current user.
function getPublicProfile(req, res, next) {
  return new Promise(function (resolve, reject) {
    request.get(
      urls.facebook.peopleApiUrl,
      {
        qs: {
          fields: 'email,family_name,gender,given_name,hd,id,link,locale,name,picture,verified_email'
        },
        headers: createHeaderWithToken(req.token)
      },
      function getUser(err, response, profile) {
        if (err) {
         // return res.status(500).send({message: err});
          reject(err);
        } else if (profile.error) {
          //return res.status(500).send({message: profile.error});
          reject(profile.err);
        }
        req.consolidated_profile = JSON.parse(profile);
        resolve(req.consolidated_profile);
        next();
      }
    );
  },function (reason){
    return res.status(500).send({message: reason});
  })
}


//Step 3: Send data from profile to Admin
function sendProfileInfoToAdmin(req, res, next) {
  return new Promise(function (resolve, reject) {
    let profile = req.consolidated_profile;
    let url = config['adminDashboard'] + 'user/' + profile.email;

    request.get(
      url,
      function (err, response, user_token) {
        if (err) {
          createOneUser(req, res, next);
          resolve(err);
        } else {
          resolve();
          next();
        }
      }
    );
  });
}

//Step 4: Send data to Radius
function persistUserInRadiusDB(req, res, next) {

  return adCheck.findOrCreate({
    where: {
      username: req.consolidated_profile.email,
      value: req.consolidated_profile.id
    }
  }).then(function (model, result) {
    req.radius_result = model;
    next();
  }).catch(function (reason) {
      return res.status(500).send({message: reason});
    }
  );
}

router.post('/facebook',
  requestOauthToken,
  getPublicProfile,
  sendProfileInfoToAdmin,
  function (req, res) {
    persistUserInRadiusDB(req, res).then(result => {
      if (result) {
        let username = result[0].dataValues.username;
        res.send({'username': username, 'token': req.token});
      } else {
        res.status(503).send({'token': req.token})
      }
    }).catch(err => {
      res.status(503).send({'error': err.stack})
    });
  });


module.exports = router;

