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
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      peopleApiUrl: 'https://people.googleapis.com/v1/people/me',
      googlePlus: 'https://people.googleapis.com/v1/people/me',//{UserId}
      url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
      urlSuffix: '&scope=https://www.googleapis.com/auth/userinfo.profile' +
        '%20profile' +
        '%20email' +
        '%20https://www.googleapis.com/auth/profile.agerange.read' +
        '%20https://www.googleapis.com/auth/user.birthday.read'+
        '%20https://www.googleapis.com/auth/user.addresses.read' +
        '%20https://www.googleapis.com/auth/user.emails.read' +
        '%20https://www.googleapis.com/auth/userinfo.email' +
        '%20https://www.googleapis.com/auth/userinfo.profile'

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
