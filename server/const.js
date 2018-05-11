let SOCIAL_LOGIN_STATIC_INFO =
  {
    facebook: {
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      googlePlus: 'https://www.googleapis.com/plus/v1/people/',//{UserId}
      url: 'https://www.facebook.com/v2.11/dialog/oauth?client_id=',
      urlSuffix: '&scope=email'
    },
    google: {
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      googlePlus: 'https://www.googleapis.com/plus/v1/people/',//{UserId}
      url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
      urlSuffix: '&scope=email%20profile'
    },
    linkedin: {
      accessTokenUrl: '',
      peopleApiUrl: '',
      googlePlus: '',//{UserId}
      url: 'https://www.linkedin.com/oauth/v2/authorization?client_id=',
      urlSuffix: '&response_type=code'
    }
  };


module.exports = {
  google: SOCIAL_LOGIN_STATIC_INFO['google'],
  facebook: SOCIAL_LOGIN_STATIC_INFO['facebook'],
  linkedin: SOCIAL_LOGIN_STATIC_INFO['linkedin'],
};
