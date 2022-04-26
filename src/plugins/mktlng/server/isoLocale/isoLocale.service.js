'use strict';

const { isoLocales } = require('./isoLocale');

function getIsoLocales() {
  return isoLocales;
}

module.exports = () => ({
  getIsoLocales,
});
