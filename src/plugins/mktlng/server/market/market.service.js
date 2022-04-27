'use strict';

const { isNil } = require('lodash/fp');
const { DEFAULT_MARKET } = require('../isoMarket/isoMarket');
const { getService, getCoreStore } = require('../utils');

function find(params) {
  return strapi.query('plugin::mktlng.market').findMany({ where: params });
}

function findById(id) {
  return strapi.query('plugin::mktlng.market').findOne({ where: { id } });
}

function findByCode(code) {
  return strapi.query('plugin::mktlng.market').findOne({ where: { code } });
}

function count(params) {
  return strapi.query('plugin::mktlng.market').count({ where: params });
}

async function create(market) {
  const result = await strapi.query('plugin::mktlng.market').create({ data: market });
  getService('metrics').sendDidUpdateMktlngMarketsEvent();
  return result;
}

async function update(params, updates) {
  const result = await strapi.query('plugin::mktlng.market').update({ where: params, data: updates });
  getService('metrics').sendDidUpdateMktlngMarketsEvent();
  return result;
}

async function deleteFn({ id }) {
  const marketToDelete = await findById(id);
  if (marketToDelete) {
    await deleteAllLocalizedEntriesFor({ market: marketToDelete.code });
    const result = await strapi.query('plugin::mktlng.market').delete({ where: { id } });
    getService('metrics').sendDidUpdateMktlngMarketsEvent();
    return result;
  }
  return marketToDelete;
}

function setDefaultMarket({ code }) {
  return getCoreStore().set({ key: 'default_market', value: code });
}

function getDefaultMarket() {
  return getCoreStore().get({ key: 'default_market' });
}

async function setIsDefault(markets) {
  if (isNil(markets)) {
    return markets;
  }
  const actualDefault = await getDefaultMarket();
  if (Array.isArray(markets)) {
    return markets.map(market => ({ ...market, isDefault: actualDefault === market.code }));
  } else {
    // single market
    return { ...markets, isDefault: actualDefault === markets.code };
  }
}

async function initDefaultMarket() {
  const count = await strapi.query('plugin::mktlng.market').count();
  if (count === 0) {
    await create(DEFAULT_MARKET);
    await setDefaultMarket({ code: DEFAULT_MARKET.code });
  }
}

async function deleteAllLocalizedEntriesFor({ market }) {
  const { hasLocalizedContentType } = getService('contentTypes');
  const localizedModels = Object.values(strapi.contentTypes).filter(hasLocalizedContentType);
  for (const model of localizedModels) {
    // FIXME: delete many content & their associations
    await strapi.query(model.uid).deleteMany({ where: { market } });
  }
}

module.exports = () => ({
  find,
  findById,
  findByCode,
  create,
  update,
  count,
  setDefaultMarket,
  getDefaultMarket,
  setIsDefault,
  delete: deleteFn,
  initDefaultMarket,
});
