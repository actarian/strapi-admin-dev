'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/iso-locales',
    handler: 'iso-locales.listIsoLocales',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.locale.read'] },
        },
      ],
    },
  },
];

const contentApiRoutes = [
];

module.exports = {
  adminRoutes,
  contentApiRoutes,
}
