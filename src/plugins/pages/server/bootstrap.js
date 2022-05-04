'use strict';

const { getService } = require('./utils');

module.exports = ({ strapi }) => {
  const entityService = getService('entityService');

  // Entity Service
  // decorate global api calls with contentType
  strapi.entityService.decorate(entityService.decorator);

};
