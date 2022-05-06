'use strict';

const contentType = require('./contentType/contentType.routes');
const isoCountry = require('./isoCountry/isoCountry.routes');
const isoLocale = require('./isoLocale/isoLocale.routes');
const isoMarket = require('./isoMarket/isoMarket.routes');
const locale = require('./locale/locale.routes');
const market = require('./market/market.routes');

module.exports = {
  admin: {
    type: 'admin',
    routes: [
      ...contentType.adminRoutes,
      ...isoCountry.adminRoutes,
      ...isoLocale.adminRoutes,
      ...isoMarket.adminRoutes,
      ...locale.adminRoutes,
      ...market.adminRoutes,
    ]
  },
  'content-api': {
    type: 'content-api',
    routes: [
      ...contentType.contentApiRoutes,
      ...isoCountry.contentApiRoutes,
      ...isoLocale.contentApiRoutes,
      ...isoMarket.contentApiRoutes,
      ...locale.contentApiRoutes,
      ...market.contentApiRoutes,
    ]
  },
};
