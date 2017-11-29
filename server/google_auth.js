let db = require('./db/index');
let express = require('express');
let router = express.Router();
let request = require('request');
let async = require('async');
let jwt = require('jwt-simple');
let urls = require('./const');
let social_urls = require('../dist/out-tsc/src/app/constants/social_login_keys.const');

function createTokenRequest( body ){
  return {
    code: body.code,
    client_id: body.clientId,
    client_secret: social_urls.social_urls.google.secret,
    redirect_uri: body.redirectUri,
    grant_type: 'authorization_code'
  }
}

function createHeaderWithToken( token ){
  let accessToken = JSON.parse(token).access_token;
  let headers = { 'authorization': 'Bearer ' + accessToken };
  return headers;
}

function createJWT( user ){
  let payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}
function createOneUser( req,res,next ){
  request.post(
    'http://localhost:3003/mocked-admin/user',
    {
      json:true,
      body:req.profile
    },
    function ( err,res, user_token ){
      if (err){
        //todo
        console.log(err);

      }
      req.token = user_token;
      next();
    }
  );
}
let findOneUser = function ( req, res,next ){

  let profile = req.profile;

  request.get(
    'http://localhost:3003/mocked-admin/user'+profile.email,
    function ( err,response, user_token ){
      if (err){
        console.log(err);
        createOneUser(req,res,next);
      }
      req.token = user_token;
      next();
    }
  );
  User.findOne({ email: profile.email }, function ( err, existingUser ){

    if ( existingUser && existingUser.provider == "google" ){
      let token = createJWT(existingUser);
      return { token: token };
      //res.send({ token: token });
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
        return { token: token };
        //res.send({ token: token });
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
        return { token: token };
        //res.send({ token: token });
      });
    }
    // var token = req.header('Authorization').split(' ')[1];
    // var payload = jwt.decode(token, config.TOKEN_SECRET);
  });
};


// Step 1. Exchange authorization code for access token.
function authWithGoogle( req, res, next ){
  request.post(
    urls.google.accessTokenUrl,
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
function getInfoFromUser( req, res, next ){

  request.get(
    urls.google.peopleApiUrl,
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
      req.oauthProfile = JSON.parse(profile);
      return next();
    }
  );

}

// Step 3. Retrieve G++ profile information about the current user.
function getGooglePlusInfoFromUser( req, res, next ){

  request.get(
    urls.google.googlePlus + req.oauthProfile.id,
    {
      headers: createHeaderWithToken(req.token)
    },
    function getUser( err, response, profile ){
      if ( err ){
        req.googlePlusInfo = { error: err };
      }

      req.googlePlusInfo = JSON.parse(profile);

      return next();
    }
  );

}


router.post('/google',
  authWithGoogle,
  getInfoFromUser,
  getGooglePlusInfoFromUser,
  function ( req, res ){
    if ( req.googlePlusInfo.error ){
      res.send(req.oauthProfile);
    } else {
      res.send(req.googlePlusInfo)
    }
  });


module.exports = router;

