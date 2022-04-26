'use strict';

const isoLocales = require('./isoLocale.data');

function getInitLocale() {
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

module.exports = {
  isoLocales,
  getInitLocale,
  DEFAULT_LOCALE,
};
