'use strict';

const { isoCountries } = require('./isoCountry');

function getIsoCountries() {
  return isoCountries;
}

module.exports = () => ({
  getIsoCountries,
});
