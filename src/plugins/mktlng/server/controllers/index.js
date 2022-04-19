'use strict';

const locales = require('./locales');
const isoLocales = require('./iso-locales');
const markets = require('./markets');
const isoMarkets = require('./iso-markets');
const contentTypes = require('./content-types');

module.exports = {
  locales,
  'iso-locales': isoLocales,
  markets,
  'iso-markets': isoMarkets,
  'content-types': contentTypes,
};
