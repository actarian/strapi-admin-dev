'use strict';

const { getService } = require('../utils');

function listIsoCountries(ctx) {
  const service = getService('isoCountries');
  ctx.body = service.getIsoCountries();
}

module.exports = {
  listIsoCountries,
};
