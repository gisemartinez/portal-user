'use strict';
module.exports = (sequelize, DataTypes) => {
  var RadCheck = sequelize.define('RadCheck', {
    username: DataTypes.STRING,
    attribute: {
      type: DataTypes.STRING,
      defaultValue: 'Cleartext-Password'
    },
    op: {
      type: DataTypes.STRING,
      defaultValue: ':='
    },
    value: DataTypes.STRING
  }, {
    tableName:'radcheck',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RadCheck;
};
