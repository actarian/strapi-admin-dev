'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/locales',
    handler: 'locales.listLocales',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/locales',
    handler: 'locales.createLocale',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.locale.create'] },
        },
      ],
    },
  },
  {
    method: 'PUT',
    path: '/locales/:id',
    handler: 'locales.updateLocale',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.locale.update'] },
        },
      ],
    },
  },
  {
    method: 'DELETE',
    path: '/locales/:id',
    handler: 'locales.deleteLocale',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.locale.delete'] },
        },
      ],
    },
  },
];

const contentApiRoutes = [
  {
    method: 'GET',
    path: '/locales',
    handler: 'locales.listLocales',
  },
];

module.exports = {
  adminRoutes,
  contentApiRoutes,
}
