/**
 * Created by gmartinez on 11/16/17.
 */
const { Pool } = require('pg');

var pool = new pg.Pool()

pool.connect(function(err, client, done) {
  client.query(/* etc, etc */)
  done()
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};
