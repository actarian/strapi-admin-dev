'use strict';

const contentTypes = require('./contentType/contentType.service');
const coreApi = require('./coreApi/coreApi.service');
const entityService = require('./entity/entity.service');
const isoCountries = require('./isoCountry/isoCountry.service');
const isoLocales = require('./isoLocale/isoLocale.service');
const isoMarkets = require('./isoMarket/isoMarket.service');
const locales = require('./locale/locale.service');
const localizations = require('./localization/localization.service');
const markets = require('./market/market.service');
const metrics = require('./metric/metric.service');
const permissions = require('./permission/permission.service');

module.exports = {
  contentTypes,
  coreApi,
  entityService,
  isoCountries,
  isoLocales,
  isoMarkets,
  locales,
  localizations,
  markets,
  metrics,
  permissions,
};
