
const { Client , Pool} = require('pg');
const client = new Client();

const config = require('../config'),
  url = `postgresql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.schema}`;

const pool = new Pool({
  connectionString: url,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
};

let promise = require('bluebird');

let options = {
  promiseLib: promise
};

let pgp = require('pg-promise')(options);
let db = pgp(url);

function getAllUsers( req,res,next ){
  db.any('select * from radacct')
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};
