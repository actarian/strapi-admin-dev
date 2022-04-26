'use strict';

const { capitalize, isArray, getOr, prop } = require('lodash/fp');
const { getService } = require('../utils');

const keys = ['create', 'read', 'update', 'delete'];
const actions = [];

actions.push(...keys.map(key => ({
  section: 'settings',
  category: 'Languages',
  subCategory: 'Locales',
  pluginName: 'mktlng',
  displayName: capitalize(key),
  uid: `locale.${key}`,
})));

actions.push(...keys.map(key => ({
  section: 'settings',
  category: 'Markets',
  subCategory: 'Markets',
  pluginName: 'mktlng',
  displayName: capitalize(key),
  uid: `market.${key}`,
})));

const addLocalesPropertyIfNeeded = ({ value: action }) => {
  const { section, options: { applyToProperties } } = action;
  // Only add the locales property to contentTypes' actions
  if (section !== 'contentTypes') {
    return;
  }
  // If the 'locales' property is already declared within the applyToProperties array, then ignore the next steps
  if (isArray(applyToProperties) && applyToProperties.includes('locales')) {
    return;
  }
  // Add the 'locales' property to the applyToProperties array (create it if necessary)
  action.options.applyToProperties = isArray(applyToProperties) ? applyToProperties.concat('locales') : ['locales'];
};

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
      const appliesToLocalesProperty = await actionProvider.appliesToProperty(
        'locales',
        action,
        subject
      );
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

const addAllMarketsToPermissions = async permissions => {
  const { actionProvider } = strapi.admin.services.permission;
  const { find: findAllMarkets } = getService('markets');
  const allMarkets = await findAllMarkets();
  const allMarketsCode = allMarkets.map(prop('code'));
  return Promise.all(
    permissions.map(async permission => {
      const { action, subject } = permission;
      const appliesToMarketsProperty = await actionProvider.appliesToProperty(
        'markets',
        action,
        subject
      );
      if (!appliesToMarketsProperty) {
        return permission;
      }
      const oldPermissionProperties = getOr({}, 'properties', permission);
      return { ...permission, properties: { ...oldPermissionProperties, markets: allMarketsCode } };
    })
  );
};

const syncSuperAdminPermissionsWithMarkets = async () => {
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
  const newSuperAdminPermissions = await addAllMarketsToPermissions(superAdminPermissions);
  await roleService.assignPermissions(superAdminRole.id, newSuperAdminPermissions);
};

const registerActions = async () => {
  const { actionProvider } = strapi.admin.services.permission;
  await actionProvider.registerMany(actions);
};

const registerActionsHooks = () => {
  const { actionProvider } = strapi.admin.services.permission;
  const { hooks } = strapi.admin.services.role;
  actionProvider.hooks.appliesPropertyToSubject.register(shouldApplyLocalesPropertyToSubject);
  hooks.willResetSuperAdminPermissions.register(addAllLocalesToPermissions);
};

const updateActionsProperties = () => {
  const { actionProvider } = strapi.admin.services.permission;
  // Register the transformation for every new action
  actionProvider.hooks.willRegister.register(addLocalesPropertyIfNeeded);
  // Handle already registered actions
  actionProvider.values().forEach(action => addLocalesPropertyIfNeeded({ value: action }));
};

module.exports = {
  actions,
  registerActions,
  registerActionsHooks,
  updateActionsProperties,
  syncSuperAdminPermissionsWithLocales,
  syncSuperAdminPermissionsWithMarkets,
};
