const helperPluginGetFilterList = {
  name: 'helper-plugin-get-filter-list',
  source: `/node_modules/@strapi/helper-plugin/build/helper-plugin.development.js`,
  find: `case 'enumeration':\\n    case 'string':\\n`,
  replace: `case 'enumeration':\\n    case 'json':\\n    case 'string':\\n`,
};

module.exports = helperPluginGetFilterList;
