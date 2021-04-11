const Sequelize = require('sequelize');
const db = require('../models');


const LandingTemplate = db.define('LandingTemplate', {
  templateId: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    field: 'template_id',
    defaultValue: Sequelize.UUIDV1
  },
  description: Sequelize.TEXT
}, {
  tableName: 'landing_template',
  timestamps: false
});


module.exports = LandingTemplate;
