'use strict';

module.exports = {
  type: 'admin',
  routes: [
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




    {
      method: 'POST',
      path: '/content-manager/actions/get-non-localized-fields',
      handler: 'content-types.getNonLocalizedAttributes',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
