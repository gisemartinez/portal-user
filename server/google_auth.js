/**
 * Created by gmartinez on 11/15/17.
 */

let db = require('./db/index');
let express = require('express');
let router = express.Router();
let request = require('request');
let async = require('async');
let jwt = require('jwt-simple');
let social_urls = require('../dist/out-tsc/src/app/constants/social_login_keys.const');
function createTokenRequest( params ){
  return { code:   params.code ,
    client_id: params.client_id,
    client_secret : params.client_secret,
    redirect_uri: params.redirect_uri,
    grant_type: params.authorization_code
  }
}

function createHeaderWithToken( token ){
  let accessToken = JSON.parse(token).access_token;
  let headers = { Authorization: 'Bearer ' + accessToken };
  return headers;
}

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

let findOneUser = function ( profile, res ){
  User.findOne({ email: profile.email }, function ( err, existingUser ){
    if ( existingUser && existingUser.provider == "google" ){
      var token = createJWT(existingUser);
      res.send({ token: token });
    }
    else if ( existingUser && existingUser.provider != "google" ){
      var user = {};
      user.provider_id = profile.id;
      user.provider = "google";
      user.email = profile.email;
      user.picture = profile.picture.replace('sz=50', 'sz=200');
      user.displayName = profile.name;
      User.findOneAndUpdate({ email: existingUser.email }, user, function ( err ){
        var token = createJWT(existingUser);
        res.send({ token: token });
      });
    }
    else {
      var user = new User();
      user.provider_id = profile.id;
      user.provider = "google";
      user.email = profile.email;
      user.picture = profile.picture.replace('sz=50', 'sz=200');
      user.displayName = profile.name;
      user.save(function ( err ){
        var token = createJWT(user);
        res.send({ token: token });
      });
    }
    // var token = req.header('Authorization').split(' ')[1];
    // var payload = jwt.decode(token, config.TOKEN_SECRET);
  });
};


router.post('/google', function authWithGoogle( req, res, next ){
  let params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: social_urls.social_urls.google.secret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  let token_request = createTokenRequest(params);

  let bodyToAuth = {
    body: token_request,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  };

  // Step 1. Exchange authorization code for access token.
  


  request.post({
      headers: bodyToAuth.headers,
      uri:social_urls.social_urls.google.accessTokenUrl,
      json: true,
      form: bodyToAuth.body},
    function obtainAccessToken( err, response, token ){
      if(err){
        return res.status(500).send({ message: err });
      }

      let headers = createHeaderWithToken(token);

      // Step 2. Retrieve profile information about the current user.

      request.get({
        uri: social_urls.social_urls.google.peopleApiUrl,
        headers: headers,
        json: true
      }, function getUser( err, response, profile ){
        if ( profile.error ){
          return res.status(500).send({ message: profile.error.message });
        }
        findOneUser(profile, res);
      });
    });
});
module.exports = router;

