'use strict';

const contentTypes = require('./contentType/contentType.controller');
const isoLocales = require('./isoLocale/isoLocale.controller');
const isoMarkets = require('./isoMarket/isoMarket.controller');
const locales = require('./locale/locale.controller');
const markets = require('./market/market.controller');

module.exports = {
  'content-types': contentTypes,
  'iso-locales': isoLocales,
  'iso-markets': isoMarkets,
  locales,
  markets,
};
