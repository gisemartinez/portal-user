/**
 * Created by gmartinez on 11/15/17.
 */
import SOCIAL_LOGIN_URLS from './const'

module.exports = function ( app ){

  function createTokenRequest( params ){
    return 'code=' + params.code +
      '&client_id=' + params.client_id +
      '&client_secret=' + SOCIAL_LOGIN_URLS.google.secret_key +
      '&redirect_uri=' + params.redirect_uri +
      '&grant_type=authorization_code';
  }

  function createHeaderWithToken( token ){
    let accessToken = JSON.parse(token).access_token;
    let headers = { Authorization: 'Bearer ' + accessToken };
    return headers;
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
  app.post('auth/google', function ( req, res ){
    let params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.GOOGLE_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    let token_request = createTokenRequest(params);

    let bodyToAuth = {
      body: token_request,
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    };

    // Step 1. Exchange authorization code for access token.

    request.post(
      SOCIAL_LOGIN_URLS.google.accessTokenUrl,
      bodyToAuth,
      function ( err, response, token ){

        let headers = createHeaderWithToken(token);

        // Step 2. Retrieve profile information about the current user.

        request.get({
          url: SOCIAL_LOGIN_URLS.google.peopleApiUrl,
          headers: headers,
          json: true
        }, function ( err, response, profile ){
          if ( profile.error ){
            return res.status(500).send({ message: profile.error.message });
          }

          findOneUser(profile, res);
        });
      });
    }
  );
};

