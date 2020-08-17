const Sequelize = require('sequelize');
const db = require('../models');


const RadCheck = db.define('RadCheck', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING(30),
  attribute: {
    type: Sequelize.STRING(30),
    defaultValue: 'Cleartext-Password'
  },
  op: {
    type: Sequelize.STRING(2),
    defaultValue: ':='
  },
  value: Sequelize.STRING(40)
}, {
  tableName: 'radcheck',
  timestamps: false,
  classMethods: {
    associate: function (models) {
      // associations can be defined here
    }
  }
});

module.exports = RadCheck;
