'use strict';

const { getService } = require('../utils');

function listIsoMarkets(ctx) {
  const service = getService('isoMarkets');
  ctx.body = service.getIsoMarkets();
}

module.exports = {
  listIsoMarkets,
};
