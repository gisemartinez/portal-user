/**
 * Created by gmartinez on 11/16/17.
 */
const { Pool } = require('pg');

let pool = new Pool();

const Sequelize = require('sequelize');

const sequelize_mysql = new Sequelize('radius', 'root', 'dijeramos', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


sequelize_mysql
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports = {
  query: (text, params) => pool.query(text, params,callback),
  //pool: mysql_pool,
  //connection : connection,
  sequelize_mysql: sequelize_mysql
};
