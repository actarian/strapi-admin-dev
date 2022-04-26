'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/iso-markets',
    handler: 'iso-markets.listIsoMarkets',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.market.read'] },
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
