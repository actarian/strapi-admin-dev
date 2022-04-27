'use strict';

const { getService } = require('../utils');

function listIsoLocales(ctx) {
  const service = getService('isoLocales');
  ctx.body = service.getIsoLocales();
}

module.exports = {
  listIsoLocales,
};
