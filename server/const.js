let SOCIAL_LOGIN_STATIC_INFO =
  {
    facebook: {
      loginDialog: {
        url: 'https://www.facebook.com/v2.11/dialog/oauth?client_id=',
        suffix: '&scope=email',
      },//step0
      accessToken: {
        url: 'https://graph.facebook.com/v10.0/oauth/access_token',
        params: {},
        method: 'GET'
      },
      profile: {
        url: 'https://graph.facebook.com/v10.0/',
        header: 'access_token'
      }
    },
    google: {
      loginDialog: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
        suffix: '&scope=https://www.googleapis.com/auth/userinfo.profile' +
          '%20profile' +
          '%20email' +
          '%20https://www.googleapis.com/auth/profile.agerange.read' +
          '%20https://www.googleapis.com/auth/user.birthday.read' +
          '%20https://www.googleapis.com/auth/user.addresses.read' +
          '%20https://www.googleapis.com/auth/user.emails.read' +
          '%20https://www.googleapis.com/auth/userinfo.email' +
          '%20https://www.googleapis.com/auth/userinfo.profile'
      },//step0
      accessToken: {
        url: 'https://oauth2.googleapis.com/token',
        params: {
          grant_type: 'authorization_code'
        },
        method: 'POST'
      },
      profile: {
        url: 'https://people.googleapis.com/v1/people/me',
        fields: 'names,emailAddresses,ageRanges,birthdays,genders,interests,residences'
      },
      profileUrl: 'https://people.googleapis.com/v1/people/me',
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      peopleApiUrl: 'https://people.googleapis.com/v1/people/me',
      googlePlus: 'https://people.googleapis.com/v1/people/me',//{UserId}
      url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
      urlSuffix: '&scope=https://www.googleapis.com/auth/userinfo.profile' +
        '%20profile' +
        '%20email' +
        '%20https://www.googleapis.com/auth/profile.agerange.read' +
        '%20https://www.googleapis.com/auth/user.birthday.read' +
        '%20https://www.googleapis.com/auth/user.addresses.read' +
        '%20https://www.googleapis.com/auth/user.emails.read' +
        '%20https://www.googleapis.com/auth/userinfo.email' +
        '%20https://www.googleapis.com/auth/userinfo.profile'

    },
    linkedin: {
      fields: '',
      accessTokenUrl: '',
      peopleApiUrl: '',
      googlePlus: '',//{UserId}
      loginDialogUrl: 'https://www.linkedin.com/oauth/v2/authorization?client_id=',
      urlSuffix: '&response_type=code'
    }
  };


module.exports = {
  google: SOCIAL_LOGIN_STATIC_INFO['google'],
  facebook: SOCIAL_LOGIN_STATIC_INFO['facebook'],
  linkedin: SOCIAL_LOGIN_STATIC_INFO['linkedin'],
};
