'use strict';

const pluginId = 'ws-seo';

const getCoreStore = () => {
  return strapi.store({ type: 'plugin', name: pluginId });
};

const getService = name => {
  return strapi.plugin(pluginId).service(name);
};

const getSeoService = () => {
  return strapi.plugin(pluginId).service('seo');
};

module.exports = {
  pluginId,
  getService,
  getCoreStore,
  getSeoService,
};
