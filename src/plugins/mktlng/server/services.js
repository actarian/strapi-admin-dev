'use strict';

const permissions = require('./services/permissions');
const metrics = require('./services/metrics');
const localizations = require('./services/localizations');
const locales = require('./services/locales');
const isoLocales = require('./services/isoLocales');
const markets = require('./services/markets');
const isoMarkets = require('./services/isoMarkets');
const entityService = require('./services/entityService');
const coreApi = require('./services/coreApi');
const contentTypes = require('./services/contentTypes');

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
