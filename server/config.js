
const config = {
  development: {
    username: 'root',
    password: 'wifree',
    database: 'wifree',
    host: 'mysql_wf',
    dialect: 'mysql',
    port:'3306',
    migrationStorage : 'json',
    adminDashboard: 'http://mock-server:3003/mock-responses/api',
    radiusServer: 'http://mock-server:3003/mock-responses/radius/login'
  },
  test: {
    username: 'root',
    password: 'dijeramos',
    database: 'radius',
    host: '127.0.0.1',
    dialect: 'mysql',
    migrationStorage : 'json',
    adminDashboard: 'http://mock-server:3003/mock-responses/api',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    port:'3306',
    migrationStorage : 'json',
    adminDashboard: process.env.ADMIN_DASHBOARD_URL,
    radiusServer: process.env.RADIUS_SERVER
  }
};


let env = process.env.NODE_ENV || 'development';
module.exports = Object.assign(config[env]);
