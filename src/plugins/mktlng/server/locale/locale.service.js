'use strict';

const { isNil } = require('lodash/fp');
const { DEFAULT_LOCALE } = require('../isoLocale/isoLocale');
const { getService, getCoreStore } = require('../utils');

const find = params => strapi.query('plugin::mktlng.locale').findMany({ where: params });

const findById = id => strapi.query('plugin::mktlng.locale').findOne({ where: { id } });

const findByCode = code => strapi.query('plugin::mktlng.locale').findOne({ where: { code } });

const count = params => strapi.query('plugin::mktlng.locale').count({ where: params });

const create = async locale => {
  const result = await strapi.query('plugin::mktlng.locale').create({ data: locale });
  getService('metrics').sendDidUpdateMktlngLocalesEvent();
  return result;
};

const update = async (params, updates) => {
  const result = await strapi.query('plugin::mktlng.locale').update({ where: params, data: updates });
  getService('metrics').sendDidUpdateMktlngLocalesEvent();
  return result;
};

const deleteFn = async ({ id }) => {
  const localeToDelete = await findById(id);
  if (localeToDelete) {
    await deleteAllLocalizedEntriesFor({ locale: localeToDelete.code });
    const result = await strapi.query('plugin::mktlng.locale').delete({ where: { id } });
    getService('metrics').sendDidUpdateMktlngLocalesEvent();
    return result;
  }
  return localeToDelete;
};

const setDefaultLocale = ({ code }) => getCoreStore().set({ key: 'default_locale', value: code });

const getDefaultLocale = () => getCoreStore().get({ key: 'default_locale' });

const setIsDefault = async locales => {
  if (isNil(locales)) {
    return locales;
  }
  const actualDefault = await getDefaultLocale();
  if (Array.isArray(locales)) {
    return locales.map(locale => ({ ...locale, isDefault: actualDefault === locale.code }));
  } else {
    // single locale
    return { ...locales, isDefault: actualDefault === locales.code };
  }
};

const initDefaultLocale = async () => {
  const existingLocalesNb = await strapi.query('plugin::mktlng.locale').count();
  if (existingLocalesNb === 0) {
    await create(DEFAULT_LOCALE);
    await setDefaultLocale({ code: DEFAULT_LOCALE.code });
  }
};

const deleteAllLocalizedEntriesFor = async ({ locale }) => {
  const { hasLocalizedContentType } = getService('contentTypes');
  const localizedModels = Object.values(strapi.contentTypes).filter(hasLocalizedContentType);
  for (const model of localizedModels) {
    // FIXME: delete many content & their associations
    await strapi.query(model.uid).deleteMany({ where: { locale } });
  }
};

module.exports = () => ({
  find,
  findById,
  findByCode,
  create,
  update,
  count,
  setDefaultLocale,
  getDefaultLocale,
  setIsDefault,
  delete: deleteFn,
  initDefaultLocale,
});
