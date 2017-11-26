"use strict";
exports.__esModule = true;
var misc_const_1 = require("./misc.const");
exports.social_keys = {
    twitter: {
        api_key: ""
    },
    facebook: {
        api_key: ""
    },
    google: {
        api_key: ""
    },
    instagram: {
        api_key: ""
    }
};
exports.social_urls = {
    'google': {
        code: '',
        clientId: '612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        redirectURI: misc_const_1.authServerBaseUrl + '/admin',
        secret: '6MaQVEA21221qQoi-yDrD5k8',
        url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=',
        urlSuffix: '&scope=email%20profile'
    },
    'facebook': {
        code: '',
        clientId: '131065570894352',
        redirectURI: misc_const_1.authServerBaseUrl + '/admin',
        secret: 'a74151d55bae152570b3a0e8874086db',
        url: 'https://www.facebook.com/v2.11/dialog/oauth?client_id=',
        urlSuffix: '&scope=email'
    },
    'linkedin': {
        code: '',
        clientId: '7795dtgk291ni1',
        redirectURI: misc_const_1.authServerBaseUrl + '/admin',
        secret: 'oBU1OUVw42FB7MWt',
        url: 'https://www.linkedin.com/oauth/v2/authorization?client_id=',
        urlSuffix: '&response_type=code'
    }
};
