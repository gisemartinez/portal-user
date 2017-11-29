'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserOAuthProfile = sequelize.define('UserOAuthProfile', {
    provider_id: DataTypes.STRING,
    email: DataTypes.STRING,
    picture: DataTypes.STRING,
    displayName: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserOAuthProfile;
};