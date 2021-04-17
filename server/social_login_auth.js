let express = require('express'),
  router = express.Router(),
  request = require('request'),
  DateFNS = require('date-fns'),
  jwt = require('jwt-simple');

const config = require('./config');
const RadCheck = require('./db/models/radcheck');
const ClientAuth = require('./db/models/client_auth');
const ClientDataCollector = require('./db/models/client_visitor_collected_data');
let staticProvidersInfo = require('./const');


//Step 1: Fetch social login options
function getClientAuthConf(req) {
  return new Promise(function (resolve, reject) {
    ClientAuth.findOne({
      where: {
        client_id: req.params.clientId,
        loginType: 'social-login'
      }
    }).then(function (model) {
        if (model == null) {
          reject(new Error("Client " + req.params.clientId + "doesn't have a social login configuration"));
        } else {
          resolve({...req, config: model.dataValues});
        }
      }
    )
  })
}

//Step 2: Before fetching users profile data, most of providers require an access token.
// Token creation may be a post or a get method using
// > provider keys
// > code received after user Accepts the profile access
// > redirectUri
function requestAuthToken(req) {

  let clientKeys = req.config.loginTypeOptions.socialMediaKeys[req.params.provider] //secret,clientId
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
              reject(new Error(req.body));
            } else {
              resolve({...req, token: JSON.parse(token)});
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
              resolve({...req, token: JSON.parse(token)});
            }
          });
        break;
      default :
        reject(new Error("Method not supported"))
    }
  })
}

// Step 3. Fetch user profile
function getPublicProfile(req) {
  let accessProfile = staticProvidersInfo[req.params.provider].profile;
  return new Promise(function (resolve, reject) {
    request.get(
      accessProfile.url,
      {
        qs: accessProfile.params(req.token.access_token),
        headers: accessProfile.header(req.token.access_token)
      },
      function (err, response, profile) {
        let profileToJSON = JSON.parse(profile)
        if (profileToJSON.error) {
          reject(new Error(profile.error));
        } else {
          resolve({...req, profile: accessProfile.convertProfile(profileToJSON)})
        }
      }
    )
  });
}


//Step 4: Persist user data
function persistObtainedProfile(req) {
  return ClientDataCollector.findOrCreate({
    where: {
      client_id: req.params.clientId,
      visitor_identifier: req.profile.visitorIdentifier
    },
    defaults: {
      client_id: req.params.clientId,
      visitorIdentifier: req.profile.visitorIdentifier,
      rawData: req.profile.rawData
    }
  }).then(function () {
    return RadCheck.findOrCreate({
      where: {
        username: req.profile.visitorIdentifier,
        value: req.profile.value
      }
    })
  }).then(()=>new Promise(function (resolve, reject){
    resolve(req)
  }))
}


router.post('/socialLogin/:clientId/:provider', function (req, res) {
  getClientAuthConf(req)
    .then(requestAuthToken)
    .then(getPublicProfile)
    .then(persistObtainedProfile).then(
    function (result) {
      if (result) {
        res.send({'username': result.profile.visitorIdentifier, 'token': result.token.access_token});
      } else {
        res.status(503).send({'token': result.accessTokenData.access_token})
      }
    }
  ).catch(err => {
    res.status(503).send({'error': err.stack})
  })
})


module.exports = router;

