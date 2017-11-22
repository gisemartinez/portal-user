/**
 * Created by gmartinez on 11/16/17.
 */
const { Pool } = require('pg');

var pool = new Pool();



const mysql = require('mysql');

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
  host: 'ec2-35-164-201-1.us-west-2.compute.amazonaws',
  port: '3306',
  user: 'wifree',
  password: 'copiamoscloud4wi',
  database: 'wifree'
});



module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: mysql_pool,
  connection : connection
};
