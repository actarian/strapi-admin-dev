'use strict';

const conditions = [{
  displayName: 'Has Locale Access',
  name: 'has-locale-access',
  plugin: 'mktlng',
  handler(user, options) {
    const { locales, markets } = options.permission.properties || {};
    const { superAdminCode } = strapi.admin.services.role.constants;
    const isSuperAdmin = user.roles.some(role => role.code === superAdminCode);
    if (isSuperAdmin) {
      return true;
    }
    return {
      locale: {
        $in: locales || [],
      },
      market: {
        $in: markets || [],
      },
    };
  },
}];

const registerConditions = async () => {
  const { conditionProvider } = strapi.admin.services.permission;
  await conditionProvider.registerMany(conditions);
};

module.exports = {
  conditions,
  registerConditions,
};
