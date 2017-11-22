let SOCIAL_LOGIN_STATIC_INFO =
  {
    facebook: {
      url: 'wahid'
    },
    google: {
      secret_key:'',
      accessTokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      peopleApiUrl: 'https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cfamily_name%2Cgender%2Cgiven_name%2Chd%2Cid%2Clink%2Clocale%2Cname%2Cpicture%2Cverified_email'
    },
  };


module.exports = {
  SOCIAL_LOGIN: SOCIAL_LOGIN_STATIC_INFO
};
