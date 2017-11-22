let db = require('./index');

module.exports = function ( app ){
  app.get('/connection-db',(req, res) => {
    getAllRadiusChecks();
    res.send('api works');
  })
};

function getAllRadiusChecks(){
  db.connection.connect(function ( err ){
    if ( !err ){
      console.log("Database is connected ... nn");
    } else {
      console.log("Error connecting database ... nn");
    }
  })
}




