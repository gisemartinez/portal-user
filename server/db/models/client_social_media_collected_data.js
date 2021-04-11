const Sequelize = require('sequelize');
const db = require('../models');
const Client = require('../models/client');

const ClientSocialMediaCollectedData = db.define('ClientSocialMediaCollectedData', {
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
  profileData: {
    type: Sequelize.JSON,
    field: 'profile_data'
  }
}, {
  tableName: 'client_social_media_collected_data',
  timestamps: true
});

ClientSocialMediaCollectedData.belongsTo(Client, {foreignKey: 'client_id'})

module.exports = ClientSocialMediaCollectedData;
