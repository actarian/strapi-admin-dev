'use strict';

const { reduce } = require('lodash/fp');
const { getService } = require('../utils');

const sendDidInitializeEvent = async () => {
  const { isLocalizedContentType } = getService('content-types');
  const numberOfContentTypes = reduce((sum, contentType) => (isLocalizedContentType(contentType) ? sum + 1 : sum), 0)(strapi.contentTypes);
  await strapi.telemetry.send('didInitializeMktlng', { numberOfContentTypes });
};

const sendDidUpdateMktlngLocalesEvent = async () => {
  const numberOfLocales = await getService('locales').count();
  await strapi.telemetry.send('didUpdateMktlngLocales', { numberOfLocales });
};

const sendDidUpdateMktlngMarketsEvent = async () => {
  const numberOfMarkets = await getService('markets').count();
  await strapi.telemetry.send('didUpdateMktlngMarkets', { numberOfMarkets });
};

module.exports = () => ({
  sendDidInitializeEvent,
  sendDidUpdateMktlngLocalesEvent,
  sendDidUpdateMktlngMarketsEvent,
});
