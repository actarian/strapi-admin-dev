'use strict';

const conditions = [
  {
    displayName: 'Has Locale Access',
    name: 'has-locale-access',
    plugin: 'mktlng',
    handler(user, options) {
      const { locales } = options.permission.properties || {};
      const { superAdminCode } = strapi.admin.services.role.constants;

      const isSuperAdmin = user.roles.some(role => role.code === superAdminCode);

      if (isSuperAdmin) {
        return true;
      }

      return {
        locale: {
          $in: locales || [],
        },
      };
    },
  },
];

const registerMktlngConditions = async () => {
  const { conditionProvider } = strapi.admin.services.permission;

  await conditionProvider.registerMany(conditions);
};

module.exports = {
  conditions,
  registerMktlngConditions,
};
