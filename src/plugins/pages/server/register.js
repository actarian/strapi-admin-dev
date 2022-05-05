'use strict';

const graphql = require('./graphql');
const { getPluginService } = require('./utils');

module.exports = ({ strapi }) => {
  // registration phase

  // slug
  /*
  const { contentTypes } = getPluginService(strapi, 'settingsService').get();
  console.log('contentTypes', contentTypes);

  // ensure we have at least one model before attempting registration
  if (!Object.keys(contentTypes).length) {
    return;
  }

  graphql.register(strapi);
  */

};
