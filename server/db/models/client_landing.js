const Sequelize = require('sequelize');
const db = require('../models');
const Client = require('../models/client');
const LandingTemplate = require('../models/landing_template');


const ClientLanding = db.define('ClientLanding', {
  uniqueId: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    field: 'unique_id',
    defaultValue: Sequelize.UUIDV1
  },
  landingChoices: {
    type: Sequelize.JSON,
    field: 'landing_choices'
  }
}, {
  tableName: 'client_landing',
  timestamps: false
});

ClientLanding.belongsTo(Client,{foreignKey: 'client_id'})
ClientLanding.belongsTo(LandingTemplate, {foreignKey: 'template_id'})

module.exports = ClientLanding;
