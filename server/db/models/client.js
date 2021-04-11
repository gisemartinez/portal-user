const Sequelize = require('sequelize');
const db = require('../models');

const Client = db.define('Client', {
  clientId: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    field: 'client_id',
    defaultValue: Sequelize.UUIDV1
  },
  name: Sequelize.STRING
}, {
  tableName: 'client',
  timestamps: false
});
module.exports = Client;
