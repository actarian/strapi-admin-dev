'use strict';

const permissions = require('./permissions');
const metrics = require('./metrics');
const localizations = require('./localizations');
const locales = require('./locales');
const isoLocales = require('./isoLocales');
const markets = require('./markets');
const isoMarkets = require('./isoMarkets');
const entityService = require('./entityService');
const coreApi = require('./coreApi');
const contentTypes = require('./contentTypes');

module.exports = {
  permissions,
  metrics,
  localizations,
  locales,
  isoLocales,
  markets,
  isoMarkets,
  entityService,
  coreApi,
  contentTypes,
};
