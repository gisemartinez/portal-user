let express = require('express'),
  router = express.Router(),
  request = require('request'),
  DateFNS = require('date-fns'),
  jwt = require('jwt-simple');

const config = require('./config');
const RadCheck = require('./db/models/radcheck');
const ClientAuth = require('./db/models/client_auth');
const ClientDataCollector = require('./db/models/client_social_media_collected_data');
let staticProvidersInfo = require('./const');


function googleHeader(req) {
  let accessToken = JSON.parse(req.body.token).access_token;
  let headers = {'authorization': 'Bearer ' + accessToken};
  return headers;
}

//Step 1: Fetch social login options
function getClientAuthConf(req, res, next) {
  return new Promise(function (resolve, reject) {
    ClientAuth.findOne({
      where: {
        client_id: req.params.clientId,
        loginType: 'social-login'
      }
    }).then(function (model) {
      if (model == null) {
        reject(new Error("Client " + req.params.clientId + "doesn't have a social login configuration"));
      }
      resolve();

      next(model.dataValues);
    })
  })
}

//Step 2: Before fetching users profile data, most of providers require an access token.
// Token creation may be a post or a get method using
// > provider keys
// > code received after user Accepts the profile access
// > redirectUri
function requestAuthToken(data, req, res, next) {

  let clientKeys = data.loginTypeOptions.socialMediaKeys[req.params.provider] //secret,clientId
  let accessToken = staticProvidersInfo[req.params.provider].accessToken;

  let tokenOauthRequest = {
    ...accessToken.params,
    client_id: clientKeys.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: clientKeys.secret,
    code: req.body.code
  }

  return new Promise(function (resolve, reject) {
    switch (accessToken.method) {
      case "GET":
        request.get(
          accessToken.url,
          {qs: tokenOauthRequest},
          function (err, params, token) {
            if (params.statusCode !== 200) {
              reject(new Error(body));
            } else {
              resolve();
              next(token);
            }
          });
        break;
      case "POST":
        request.post(
          accessToken.url,
          {
            form: tokenOauthRequest
          },
          function (err, params, token) {
            if (params.statusCode !== 200) {
              reject(new Error(err));
            } else {
              resolve();
              next(JSON.parse(token));
            }
          });
        break;
      default :
        reject(new Error("Method not supported"))
    }
  })
}

// Step 3. Fetch user profile
function getPublicProfile(data, req, res, next) {
  let accessProfile = staticProvidersInfo[req.params.provider].profile;
  return new Promise(function (resolve, reject) {
    request.get(
      accessProfile.url,
      {
        qs: {
          personFields: accessProfile.fields
        },
        headers: {'authorization': 'Bearer ' + data.access_token}
      },
      function (err, response, profile) {
        if (err) {
          //return res.status(500).send({ message: err });
          reject(new Error(err));
        } else if (profile.error) {
          //return res.status(500).send({ message: profile.error });
          reject(new Error(profile.err));
        }
        next({
          "accessTokenData": data,
          "profile":JSON.parse(profile)
        });
      }
    )
  });
}


//Step 4: Persist user data
function persistObtainedProfile(data, req, res, next) {
  return ClientDataCollector.findOrCreate({
    where: {
      client_id: req.params.clientId,
      visitor_identifier: data.profile.resourceName
    },
    defaults: {
      client_id: req.params.clientId,
      visitorIdentifier: data.profile.resourceName,
      profileData: data.profile
    }
  }).then(function () {
    return RadCheck.findOrCreate({
      where: {
        username: data.profile.resourceName,
        value: data.profile.etag
      }
    });
  })
}



router.post('/socialLogin/:clientId/:provider',
  getClientAuthConf,
  requestAuthToken,
  getPublicProfile,
  function (data, req, res, error) {
    persistObtainedProfile(data, req,res, error).then(result => {
      if (result) {
        res.send({'username': data.profile.resourceName, 'token': data.accessTokenData.access_token});
      } else {
        res.status(503).send({'token': req.token})
      }
    }).catch(err => {
      res.status(503).send({'error': err.stack})
    })
  });

module.exports = router;

