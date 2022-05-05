'use strict';

const { getService } = require('./utils');

module.exports = ({ strapi }) => {
  const entityService = getService('entityService');

  // Entity Service
  // decorate global api calls with contentType
  strapi.entityService.decorate(entityService.decorator);

  // Slug Service
  /*
  const settingsService = getPluginService(strapi, 'settingsService');
  const settings = settingsService.get();

  // build settings structure
  const normalizedSettings = settingsService.build(settings);

  // reset plugin settings
  settingsService.set(normalizedSettings);

  // set up lifecycles
  const subscribe = {
    models: _.map(normalizedSettings.models, (m) => m.uid),
  };

  SUPPORTED_LIFECYCLES.forEach((lifecycle) => {
    subscribe[lifecycle] = (ctx) => {
      getPluginService(strapi, 'slugService').slugify(ctx);
    };
  });

  strapi.db.lifecycles.subscribe(subscribe);
  */
};
