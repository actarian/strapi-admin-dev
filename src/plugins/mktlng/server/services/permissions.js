'use strict';

const mktlngActionsService = require('./permissions/actions');
const sectionsBuilderService = require('./permissions/sections-builder');
const engineService = require('./permissions/engine');

module.exports = () => ({
  actions: mktlngActionsService,
  sectionsBuilder: sectionsBuilderService,
  engine: engineService,
});
