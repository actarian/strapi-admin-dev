'use strict';

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/locales',
      handler: 'locales.listLocales',
    },
    {
      method: 'GET',
      path: '/markets',
      handler: 'markets.listMarkets',
    },
  ],
};
