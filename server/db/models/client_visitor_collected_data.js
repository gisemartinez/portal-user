const Sequelize = require('sequelize');
const db = require('../models');
const Client = require('../models/client');

const ClientVisitorCollectedData = db.define('ClientVisitorCollectedData', {
  uniqueId: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    field: 'unique_id',
    defaultValue: Sequelize.UUIDV1
  },
  visitorIdentifier: {
    type: Sequelize.STRING,
    field: 'visitor_identifier'
  },
  rawData: {
    type: Sequelize.JSON,
    field: 'raw_data'
  }
}, {
  tableName: 'client_visitor_collected_data',
  timestamps: true
});

ClientVisitorCollectedData.belongsTo(Client, {foreignKey: 'client_id'})

module.exports = ClientVisitorCollectedData;
