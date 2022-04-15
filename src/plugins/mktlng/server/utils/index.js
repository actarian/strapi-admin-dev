'use strict';

const getCoreStore = () => {
  return strapi.store({ type: 'plugin', name: 'mktlng' });
};

// retrieve a local service
const getService = name => {
  return strapi.plugin('mktlng').service(name);
};

module.exports = {
  getService,
  getCoreStore,
};
