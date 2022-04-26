'use strict';

const adminRoutes = [
  {
    method: 'GET',
    path: '/markets',
    handler: 'markets.listMarkets',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/markets',
    handler: 'markets.createMarket',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.market.create'] },
        },
      ],
    },
  },
  {
    method: 'PUT',
    path: '/markets/:id',
    handler: 'markets.updateMarket',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.market.update'] },
        },
      ],
    },
  },
  {
    method: 'DELETE',
    path: '/markets/:id',
    handler: 'markets.deleteMarket',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'plugin::content-manager.hasPermissions',
          config: { actions: ['plugin::mktlng.market.delete'] },
        },
      ],
    },
  },
];

const contentApiRoutes = [
  {
    method: 'GET',
    path: '/markets',
    handler: 'markets.listMarkets',
  },
];

module.exports = {
  adminRoutes,
  contentApiRoutes,
}
