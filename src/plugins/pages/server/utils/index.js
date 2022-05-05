'use strict';

const { contentAPI } = require('@strapi/utils/lib/sanitize');
const { ForbiddenError } = require('@strapi/utils/lib/errors');

const pluginPkg = require('../../package.json');
const pluginId = pluginPkg.strapi.name;

const getCoreStore = () => {
  return strapi.store({ type: 'plugin', name: pluginId });
};

const getPluginService = (strapi, name, plugin = pluginId) => strapi.plugin(plugin).service(name);

const getService = name => {
  return strapi.plugin(pluginId).service(name);
};

const getSeoService = () => {
  return strapi.plugin(pluginId).service('seo');
};

const hasRequiredModelScopes = async (strapi, uid, auth) => {
  try {
    await strapi.auth.verify(auth, { scope: `${uid}.find` });
  } catch (error) {
    throw new ForbiddenError();
  }
};

const sanitizeOutput = (data, contentType, auth) => contentAPI.output(data, contentType, { auth });

module.exports = {
  pluginId,
  getPluginService,
  getService,
  getCoreStore,
  getSeoService,
  hasRequiredModelScopes,
  sanitizeOutput,
};
