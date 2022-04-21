'use strict';

const permissions = require('./permissions');
const metrics = require('./metrics');
const localizations = require('./localizations');
const locales = require('./locales');
const isoLocales = require('./iso-locales');
const markets = require('./markets');
const isoMarkets = require('./iso-markets');
const entityServiceDecorator = require('./entity-service-decorator');
const coreApi = require('./core-api');
const contentTypes = require('./content-types');

module.exports = {
  permissions,
  metrics,
  localizations,
  locales,
  'iso-locales': isoLocales,
  markets,
  'iso-markets': isoMarkets,
  'entity-service-decorator': entityServiceDecorator,
  'core-api': coreApi,
  'content-types': contentTypes,
};
