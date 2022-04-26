'use strict';

const actionsService = require('./permission.actions');
const builderService = require('./permission.builder');
const engineService = require('./permission.engine');

module.exports = () => ({
  actions: actionsService,
  builder: builderService,
  engine: engineService,
});
