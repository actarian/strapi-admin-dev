'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/iso-countries',
    handler: 'iso-countries.listIsoCountries',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.country.read'] },
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
