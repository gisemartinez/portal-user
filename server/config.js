/**
 * Created by gmartinez on 11/16/17.
 */
const config = {
  development: {
    env: 'development',
    db: {
      host:'127.0.0.1',
      port: 3211,
      user:'admin',
      password:'pass',
      schema: 'database'
    },
    adminDashboard: 'http://localhost:3003/mock-admin/',
    TOKEN_SECRET: 'secret'
  }
};

let env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config[env]);
