
const config = {
  development: {
    username: 'wifree',
    password: 'copiamoscloud4wi',
    database: 'wifree',
    host: 'ec2-35-164-201-1.us-west-2.compute.amazonaws.com',
    dialect: 'mysql',
    migrationStorage : 'json',
    adminDashboard: 'http://localhost:3003/mock-admin/',
    TOKEN_SECRET: 'secret',
    socialMediaKeys: {
      facebook:{
        clientId:'131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google:{
        clientId:'612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        secret: '6MaQVEA21221qQoi-yDrD5k8'
      },
      linkedin:{
        clientId: '7795dtgk291ni1',
        secret:'oBU1OUVw42FB7MWt'
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
    adminDashboard: 'http://localhost:3003/mock-admin/',
    TOKEN_SECRET: 'secret',
    socialMediaKeys: {
      facebook:{
        clientId:'131065570894352',
        secret: 'a74151d55bae152570b3a0e8874086db'
      },
      google:{
        clientId:'612883061882-hkbrnj033g9eg59t9iaoo4dernuiv7vf.apps.googleusercontent.com',
        secret: '6MaQVEA21221qQoi-yDrD5k8'
      },
      linkedin:{
        clientId: '7795dtgk291ni1',
        secret:'oBU1OUVw42FB7MWt'
      }
    }
  }
  /*,
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    migrationStorage : 'json',
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    adminDashboard: process.env.ADMIN_DASHBOARD_URL,
    socialMediaKeys: {
      facebook:{
        clientId: process.env.FACEBOOK_CLIENT_ID,
        secret: process.env.FACEBOOK_SECRET
      },
      google:{
        clientId: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_SECRET
      },
      linkedin:{
        clientId: process.env.LINKEDIN_CLIENT_ID,
        secret:process.env.LINKEDIN_SECRET
      }
    }
  }*/
};


let env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config[env]);
