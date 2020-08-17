'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const config    = require('../../config');

module.exports = new Sequelize(config.database, config.username, config.password, config);
