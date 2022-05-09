'use strict';

const { capitalize, isArray, getOr, prop } = require('lodash/fp');
const { getService } = require('../utils');

const keys = ['create', 'read', 'update', 'delete'];
const actions = [];

actions.push(...keys.map(key => ({
  section: 'settings',
  category: 'Pages',
  subCategory: 'Pages',
  pluginName: 'pages',
  displayName: capitalize(key),
  uid: `pages.${key}`,
})));

const shouldApplyLocalesPropertyToSubject = ({ property, subject }) => {
  if (property === 'locales') {
    const model = strapi.getModel(subject);
    return getService('contentTypes').hasLocalizedContentType(model);
  }
  return true;
};

const addAllLocalesToPermissions = async permissions => {
  const { actionProvider } = strapi.admin.services.permission;
  const { find: findAllLocales } = getService('locales');
  const allLocales = await findAllLocales();
  const allLocalesCode = allLocales.map(prop('code'));
  return Promise.all(
    permissions.map(async permission => {
      const { action, subject } = permission;
      const appliesToLocalesProperty = await actionProvider.appliesToProperty('locales', action, subject);
      if (!appliesToLocalesProperty) {
        return permission;
      }
      const oldPermissionProperties = getOr({}, 'properties', permission);
      return { ...permission, properties: { ...oldPermissionProperties, locales: allLocalesCode } };
    })
  );
};

const syncSuperAdminPermissionsWithLocales = async () => {
  const roleService = strapi.admin.services.role;
  const permissionService = strapi.admin.services.permission;
  const superAdminRole = await roleService.getSuperAdmin();
  if (!superAdminRole) {
    return;
  }
  const superAdminPermissions = await permissionService.findMany({
    where: {
      role: {
        id: superAdminRole.id,
      },
    },
  });
  const newSuperAdminPermissions = await addAllLocalesToPermissions(superAdminPermissions);
  await roleService.assignPermissions(superAdminRole.id, newSuperAdminPermissions);
};

const registerActions = async () => {
  const { actionProvider } = strapi.admin.services.permission;
  await actionProvider.registerMany(actions);
};

module.exports = () => ({
  actions,
  registerActions,
  syncSuperAdminPermissionsWithLocales,
});
