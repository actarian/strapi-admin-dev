'use strict';

const { isNil } = require('lodash/fp');
const { DEFAULT_LOCALE } = require('../isoLocale/isoLocale');
const { getService, getCoreStore } = require('../utils');
const { ApplicationError } = require('@strapi/utils').errors;

const find = params => strapi.query('plugin::mktlng.locale').findMany({ where: params });

const findById = id => strapi.query('plugin::mktlng.locale').findOne({ where: { id } });

const findByCode = code => strapi.query('plugin::mktlng.locale').findOne({ where: { code } });

const count = params => strapi.query('plugin::mktlng.locale').count({ where: params });

async function create(locale) {
  const result = await strapi.query('plugin::mktlng.locale').create({ data: locale });
  getService('metrics').sendDidUpdateMktlngLocalesEvent();
  return result;
};

async function update(params, updates) {
  const result = await strapi.query('plugin::mktlng.locale').update({ where: params, data: updates });
  getService('metrics').sendDidUpdateMktlngLocalesEvent();
  return result;
};

async function deleteFn({ id }) {
  const localeToDelete = await findById(id);
  if (localeToDelete) {
    await deleteAllLocalizedEntriesFor({ locale: localeToDelete.code });
    const result = await strapi.query('plugin::mktlng.locale').delete({ where: { id } });
    getService('metrics').sendDidUpdateMktlngLocalesEvent();
    return result;
  }
  return localeToDelete;
};

function setDefaultLocale({ code }) {
  return getCoreStore().set({ key: 'default_locale', value: code });
}

function getDefaultLocale() {
  return getCoreStore().get({ key: 'default_locale' });
}

async function setIsDefault(locales) {
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

async function initDefaultLocale() {
  const count = await strapi.query('plugin::mktlng.locale').count();
  if (count === 0) {
    await create(DEFAULT_LOCALE);
    await setDefaultLocale({ code: DEFAULT_LOCALE.code });
  }
};

async function deleteAllLocalizedEntriesFor({ locale }) {
  const { hasLocalizedContentType } = getService('contentTypes');
  const localizedModels = Object.values(strapi.contentTypes).filter(hasLocalizedContentType);
  for (const model of localizedModels) {
    // FIXME: delete many content & their associations
    await strapi.query(model.uid).deleteMany({ where: { locale } });
  }
};

async function getValidLocale(locale) {
  if (isNil(locale)) {
    return getDefaultLocale();
  }
  const foundLocale = await findByCode(locale);
  if (!foundLocale) {
    throw new ApplicationError('Locale not found');
  }
  return locale;
};

/**
 * Assigns a valid locale or the default one if not define
 * @param {object} data
 */
async function assignValidLocale(data) {
  if (!data) {
    return;
  }
  try {
    data.locale = await getValidLocale(data.locale);
  } catch (e) {
    throw new ApplicationError("This locale doesn't exist");
  }
};

function isLocalized(attribute) {
  return attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales;
}

function getFlatLocalizedAttributes(schema) {
  return Object.keys(schema.attributes).reduce((p, key) => {
    const attribute = schema.attributes[key];
    if (attribute.type === 'component') {
      const component = strapi.components[attribute.component];
      return p.concat({ key, attribute: getFlatLocalizedAttributes(component) });
    } else if (isLocalized(attribute)) {
      return p.concat({ key, attribute });
    }
    return p;
  }, []);
};

function deserialize(rawValue) {
  if (rawValue) {
    try {
      return JSON.parse(rawValue);
    } catch (error) {
      return {};
    }
  }
  return {};
}

function getValueForLocale_json(rawValue, locale) {
  const parsedValue = deserialize(rawValue);
  // console.log('parsedValue', rawValue, parsedValue, locale);
  return parsedValue[locale.code] || parsedValue[locale.defaultCode] || parsedValue[Object.keys(parsedValue)[0]];
}

function getValueForLocale(jsonValue, locale) {
  // console.log('jsonValue', jsonValue, locale);
  return jsonValue ? (jsonValue[locale.code] || jsonValue[locale.defaultCode] || jsonValue[Object.keys(jsonValue)[0]]) : null;
}

function localizeAttribute(attribute, value, locale) {
  if (Array.isArray(attribute)) {
    localizeAttributes(attribute, value, locale);
    return value;
  } else {
    return getValueForLocale(value, locale);
  }
}

function localizeAttributes(attributeTuples, entry, locale) {
  if (!entry) {
    return;
  }
  attributeTuples.forEach(attributeTuple => {
    const key = attributeTuple.key;
    const value = entry[key];
    entry[key] = localizeAttribute(attributeTuple.attribute, value, locale);
    /*
    if (Array.isArray(attributeTuple.attribute)) {
      localizeAttributes(attributeTuple.attribute, value, locale);
    } else {
      entry[key] = getValueForLocale(value, locale);
    }
    */
  });
}

async function getLocaleParams(locale) {
  const defaultLocale = await getDefaultLocale();
  const validLocale = await findByCode(locale);
  const localeParams = validLocale ? { code: validLocale.code, defaultCode: defaultLocale } : null;
  console.log('LocaleService.getLocaleParams', localeParams);
  return localeParams;
}

async function localizeEntry(entry, uid, locale) {
  const model = strapi.getModel(uid);
  const localizedAttributeTuples = getFlatLocalizedAttributes(model);
  const hasLocale = localizedAttributeTuples.length > 0;
  // console.log(uid, 'localizeEntry.hasLocale', hasLocale);
  if (!hasLocale) {
    return entry;
  }
  const localeParams = await getLocaleParams(locale);
  if (!localeParams) {
    return entry;
  }
  // console.log('entry', entry);
  localizeAttributes(localizedAttributeTuples, entry, localeParams);
  // console.log(entry, localizedAttributeTuples, hasLocale);
  // console.log('localizedAttributeTuples', localizedAttributeTuples);
  // console.log('entityServiceDecorator.findOne', uid, id, parameters);
  // await syncLocalizations(entry, { model });
  // await syncNonLocalizedAttributes(entry, { model });
  return entry;
}

async function localizeEntries(entries, uid, locale) {
  const model = strapi.getModel(uid);
  if (model.kind === 'singleType') {
    return await localizeEntry(entries, uid, locale);
  }
  const localizedAttributeTuples = getFlatLocalizedAttributes(model);
  const hasLocale = localizedAttributeTuples.length > 0;
  // console.log(uid, 'localizeEntries.hasLocale', hasLocale);
  if (!hasLocale) {
    return entries;
  }
  const localeParams = await getLocaleParams(locale);
  if (!localeParams) {
    return entries;
  }
  entries.forEach(entry => {
    // console.log(entry);
    localizeAttributes(localizedAttributeTuples, entry, localeParams);
  });
  return entries;
}

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
  localizeEntry,
  localizeEntries,
  getValidLocale,
  assignValidLocale,
});
