'use strict';

const { getService } = require('../../utils');

/**
 * @typedef {object} WillRegisterPermissionContext
 * @property {Permission} permission
 * @property {object} user
 * @property {object} condition
 */

/**
 * Locales property handler for the permission engine
 * Add the has-locale-access condition if the locales property is defined
 * @param {WillRegisterPermissionContext} context
 */
const willRegisterPermission = context => {
  const { permission, condition, user } = context;
  const { subject, properties } = permission;
  const isSuperAdmin = strapi.admin.services.role.hasSuperAdminRole(user);
  if (isSuperAdmin) {
    return;
  }
  const { locales, markets } = properties || {};
  const { hasLocalizedContentType } = getService('contentTypes');
  // If there is no subject defined, ignore the permission
  if (!subject) {
    return;
  }
  const ct = strapi.contentTypes[subject];
  // If the subject exists but isn't localized, ignore the permission
  if (!hasLocalizedContentType(ct)) {
    return;
  }
  // If the subject is localized but the locales property is null (access to all locales), ignore the permission
  if (locales === null) {
    return;
  }
  // If the subject has market but the markets property is null (access to all markets), ignore the permission
  if (markets === null) {
    return;
  }
  condition.and({
    locale: {
      $in: locales || [],
    },
    market: {
      $in: markets || [],
    },
  });
};

const registerPermissionsHandlers = () => {
  const { engine } = strapi.admin.services.permission;
  engine.hooks.willRegisterPermission.register(willRegisterPermission);
};

module.exports = {
  willRegisterPermission,
  registerPermissionsHandlers,
};
