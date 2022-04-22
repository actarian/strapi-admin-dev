'use strict';

const locales = require('./controllers/locales');
const isoLocales = require('./controllers/iso-locales');
const markets = require('./controllers/markets');
const isoMarkets = require('./controllers/iso-markets');
const contentTypes = require('./controllers/content-types');

module.exports = {
  locales,
  'iso-locales': isoLocales,
  markets,
  'iso-markets': isoMarkets,
  'content-types': contentTypes,
};
