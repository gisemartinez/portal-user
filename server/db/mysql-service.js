
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

var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp(url);

// add query functions

module.exports = {
  getAllUsers: getAllUsers,
  getAllPuppies: getAllPuppies,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};
