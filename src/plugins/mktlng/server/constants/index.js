'use strict';

const isoLocales = require('./iso-locales');

/**
 * Returns the default locale based either on env var or english
 * @returns {string}
 */
const getInitLocale = () => {
  const envLocaleCode = process.env.STRAPI_PLUGIN_MKTLNG_INIT_LOCALE_CODE;
  if (envLocaleCode) {
    const matchingLocale = isoLocales.find(({ code }) => code === envLocaleCode);
    if (!matchingLocale) {
      throw new Error(
        'Unknown locale code provided in the environment variable STRAPI_PLUGIN_MKTLNG_INIT_LOCALE_CODE'
      );
    }
    return { ...matchingLocale };
  }
  return {
    code: 'en',
    name: 'English (en)',
  };
};

const DEFAULT_LOCALE = getInitLocale();

const isoMarkets = require('./iso-markets');

/**
 * Returns the default market based either on env var or international
 * @returns {string}
 */
const getInitMarket = () => {
  const envMarketCode = process.env.STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE;
  if (envMarketCode) {
    const matchingMarket = isoMarkets.find(({ code }) => code === envMarketCode);
    if (!matchingMarket) {
      throw new Error(
        'Unknown market code provided in the environment variable STRAPI_PLUGIN_MKTLNG_INIT_MARKET_CODE'
      );
    }
    return { ...matchingMarket };
  }
  return {
    code: 'WW',
    name: 'International',
  };
};

const DEFAULT_MARKET = getInitMarket();

module.exports = {
  isoLocales,
  DEFAULT_LOCALE,
  getInitLocale,
  isoMarkets,
  DEFAULT_MARKET,
  getInitMarket,
};
