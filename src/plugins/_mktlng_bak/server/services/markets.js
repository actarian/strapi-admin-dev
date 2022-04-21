'use strict';

const { isNil } = require('lodash/fp');
const { DEFAULT_MARKET } = require('../constants');
const { getService } = require('../utils');
const { getCoreStore } = require('../utils');

const find = params => strapi.query('plugin::mktlng.market').findMany({ where: params });

const findById = id => strapi.query('plugin::mktlng.market').findOne({ where: { id } });

const findByCode = code => strapi.query('plugin::mktlng.market').findOne({ where: { code } });

const count = params => strapi.query('plugin::mktlng.market').count({ where: params });

const create = async market => {
  const result = await strapi.query('plugin::mktlng.market').create({ data: market });
  getService('metrics').sendDidUpdateMktlngMarketsEvent();
  return result;
};

const update = async (params, updates) => {
  const result = await strapi.query('plugin::mktlng.market').update({ where: params, data: updates });
  getService('metrics').sendDidUpdateMktlngMarketsEvent();
  return result;
};

const deleteFn = async ({ id }) => {
  const marketToDelete = await findById(id);
  if (marketToDelete) {
    await deleteAllLocalizedEntriesFor({ market: marketToDelete.code });
    const result = await strapi.query('plugin::mktlng.market').delete({ where: { id } });
    getService('metrics').sendDidUpdateMktlngMarketsEvent();
    return result;
  }
  return marketToDelete;
};

const setDefaultMarket = ({ code }) => getCoreStore().set({ key: 'default_market', value: code });

const getDefaultMarket = () => getCoreStore().get({ key: 'default_market' });

const setIsDefault = async markets => {
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
};

const initDefaultMarket = async () => {
  const existingMarketsNb = await strapi.query('plugin::mktlng.market').count();
  if (existingMarketsNb === 0) {
    await create(DEFAULT_MARKET);
    await setDefaultMarket({ code: DEFAULT_MARKET.code });
  }
};

const deleteAllLocalizedEntriesFor = async ({ market }) => {
  const { hasLocalizedContentType } = getService('content-types');
  const localizedModels = Object.values(strapi.contentTypes).filter(hasLocalizedContentType);
  for (const model of localizedModels) {
    // FIXME: delete many content & their associations
    await strapi.query(model.uid).deleteMany({ where: { market } });
  }
};

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
