module.exports = {
  apps : [
    {
      name        : 'portal-user',
      script      : 'server/server.js',
      watch       : true,
      instances   : '1',
      exec_mode   : 'cluster',
      env : {
        'NODE_ENV': 'development'
      },
      env_production : {
        'NODE_ENV': 'production',
        'DB_USERNAME':'wifree',
        'DB_PASSWORD':'copiamoscloud4wi',
        'DB_NAME':'wifree',
        'DB_HOSTNAME':'ec2-35-164-201-1.us-west-2.compute.amazonaws.com',
        'ADMIN_DASHBOARD_URL': 'http://localhost:3003/mock-admin/',
        'TOKEN_SECRET':'secret_not_used_yet',
        'FACEBOOK_CLIENT_ID': '131065570894352',
        'GOOGLE_CLIENT_ID': '612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        'TWITTER_CLIENT_ID': '',
        'LINKEDIN_CLIENT_ID': '',
        'FACEBOOK_SECRET': 'a74151d55bae152570b3a0e8874086db',
        'GOOGLE_SECRET': '6MaQVEA21221qQoi-yDrD5k8',
        'TWITTER_SECRET': '',
        'LINKEDIN_SECRET': '',
      }
    },{
      name        : 'mocked-admin',
      script      : 'mock-responses.js',
      watch       : true,
      instances   : '1',
      exec_mode   : 'cluster',
      env : {
        'NODE_ENV': 'development'
      },
      env_production : {
        'NODE_ENV': 'production'
      }
  }
  ]};
