'use strict';

module.exports = (sequelize, DataTypes) => {
  const RadCheck = sequelize.define('RadCheck', {
    username: DataTypes.STRING(30),
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    attribute: {
      type: DataTypes.STRING(30),
      defaultValue: 'Cleartext-Password'
    },
    op: {
      type: DataTypes.STRING(2),
      defaultValue: ':='
    },
    value: DataTypes.STRING(40)
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
