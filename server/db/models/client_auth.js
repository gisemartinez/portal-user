const Sequelize = require('sequelize');
const db = require('../models');
const Client = require('../models/client');

const ClientAuth = db.define('ClientAuth', {
  uniqueId: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    field: 'unique_id',
    defaultValue: Sequelize.UUIDV1
  },
  loginType: {
    type: Sequelize.STRING(25),
    field: 'login_type'
  },
  loginTypeOptions: {
    type: Sequelize.JSON,
    field: 'login_type_options'
  }
}, {
  tableName: 'client_auth',
  timestamps: false
});

ClientAuth.belongsTo(Client, {foreignKey: 'client_id'})

module.exports = ClientAuth;
