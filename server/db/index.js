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

/*const mysql = require('mysql');

const mysql_pool = mysql.createPool({
  connectionLimit : 10,
  host: 'ec2-35-164-201-1.us-west-2.compute.amazonaws',
  port: '3306',
  user: 'wifree',
  password: 'copiamoscloud4wi',
  database: 'wifree'
});

const connection = mysql.createConnection({
  connectionLimit : 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'dijeramos',
  database: 'radius'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
    console.log(err);
  }
});*/


module.exports = {
  query: (text, params) => pool.query(text, params,callback),
  //pool: mysql_pool,
  //connection : connection,
  sequelize_mysql: sequelize_mysql
};
