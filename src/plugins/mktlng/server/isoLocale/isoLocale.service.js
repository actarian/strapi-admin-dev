'use strict';

const { isoLocales } = require('./isoLocale');

const getIsoLocales = () => isoLocales;

module.exports = () => ({
  getIsoLocales,
});
