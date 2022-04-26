const contentManagerConfigurationAttributes = {
  name: 'contentManagerConfigurationAttributes',
  source: `/node_modules/@strapi/plugin-content-manager/server/services/utils/configuration/attributes.js`,
  find: /* javascript */`const NON_LISTABLES = ['json', 'password', 'richtext', 'dynamiczone'];`,
  replace: /* javascript */`const NON_LISTABLES = ['password', 'richtext', 'dynamiczone'];`,
};

module.exports = contentManagerConfigurationAttributes;
