module.exports = {
  development: {
    username: 'root',
    password: 'dijeramos',
    database: 'radius',
    host: '127.0.0.1',
    dialect: 'mysql',
    migrationStorage : 'json',
    socialMediaKeys: {
      facebook:{
        clientId:'131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google:{
        clientId:'612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        secret: '6MaQVEA21221qQoi-yDrD5k8'
      }
    }
  },
  test: {
    username: 'root',
    password: 'dijeramos',
    database: 'radius',
    host: '127.0.0.1',
    dialect: 'mysql',
    migrationStorage : 'json',
    socialMediaKeys: {
      facebook:{
        clientId:'131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google:{
        clientId:'612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        secret: '6MaQVEA21221qQoi-yDrD5k8'
      }
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    migrationStorage : 'json',
    socialMediaKeys: {
      facebook:{
        clientId: process.env.FACEBOOK_CLIENT_ID,
        secret: process.env.FACEBOOK_SECRET
      },
      google:{
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_SECRET
      }
    }
  }
};
