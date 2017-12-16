let SOCIAL_LOGIN_STATIC_INFO =
  {
    facebook: {
      accessTokenUrl: 'https://graph.facebook.com/v2.11/oauth/access_token',
      peopleApiUrl: 'https://graph.facebook.com/v2.11/me',
      googlePlus: 'https://www.googleapis.com/plus/v1/people/'//{UserId}
    },
    google: {
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      googlePlus: 'https://www.googleapis.com/plus/v1/people/'//{UserId}
    },
  };


module.exports = {
  google: SOCIAL_LOGIN_STATIC_INFO['google'],
  facebook: SOCIAL_LOGIN_STATIC_INFO['facebook']
};
