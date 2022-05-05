'use strict';

const { getPluginService } = require('./utils');
const slug = require('./slug/slug.graphql');

function register(strapi) {
  // add graphql query if present
  if (strapi.plugin('graphql')) {
    strapi.log.info('[slugify] graphql detected, registering queries');

    // build plugins schema extension

    // !!! todo - move to slug.graphql.js
    const extension = ({ nexus }) => ({
      types: slug.getCustomTypes(strapi, nexus),
      resolversConfig: slug.getResolversConfig(),
    });

    getPluginService(strapi, 'extension', 'graphql').use(extension);
  }
};

module.exports = {
  register,
};
