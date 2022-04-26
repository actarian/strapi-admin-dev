'use strict';

const { has, omit, isArray } = require('lodash/fp');
const { ApplicationError } = require('@strapi/utils').errors;
const { getService } = require('../utils');

const LOCALE_QUERY_FILTER = 'locale';
const SINGLE_ENTRY_ACTIONS = ['findOne', 'update', 'delete'];
const BULK_ACTIONS = ['delete'];

const paramsContain = (key, params) => {
  return (has(key, params.filters) || (isArray(params.filters) && params.filters.some((clause) => has(key, clause))));
};

/**
 * Adds default locale or replaces locale by locale in query params
 * @param {object} params - query params
 * @param {object} ctx
 */
const wrapParams = async (params = {}, ctx = {}) => {
  const { action } = ctx;
  params = { ...params };

  const locale = LOCALE_QUERY_FILTER;
  if (params[locale]) {
    const value = delete params[locale];
    delete params[locale];
    if (value !== 'all') {
      params = {
        ...params,
        filters: {
          $and: [{ locale: value }].concat(params.filters || []),
        },
      };
      return params;
    }
  }

  const entityDefinedById = paramsContain('id', params) && SINGLE_ENTRY_ACTIONS.includes(action);
  const entitiesDefinedByIds = paramsContain('id.$in', params) && BULK_ACTIONS.includes(action);

  if (entityDefinedById || entitiesDefinedByIds) {
    return params;
  }

  const { getDefaultLocale } = getService('locales');

  params = {
    ...params,
    filters: {
      $and: [{ locale: await getDefaultLocale() }].concat(params.filters || []),
    },
  };
  return params;
};

/**
 * Assigns a valid locale or the default one if not define
 * @param {object} data
 */
const assignValidLocale = async (data) => {
  const { getValidLocale } = getService('contentTypes');
  if (!data) {
    return;
  }
  try {
    data.locale = await getValidLocale(data.locale);
  } catch (e) {
    throw new ApplicationError("This locale doesn't exist");
  }
};

/**
 * Decorates the entity service with Mktlng business logic
 * @param {object} service - entity service
 */
const decorator = (service) => ({
  /**
   * Wraps query options. In particular will add default locale to query params
   * @param {object} opts - Query options object (params, data, files, populate)
   * @param {object} ctx - Query context
   * @param {object} ctx.model - Model that is being used
   */
  async wrapParams(params = {}, ctx = {}) {
    console.log('entityServiceDecorator.wrapParams', params, ctx);
    const wrappedParams = await service.wrapParams.call(this, params, ctx);
    const model = strapi.getModel(ctx.uid);
    const { hasLocalizedContentType } = getService('contentTypes');
    // console.log('entityServiceDecorator.wrapParams', params, wrappedParams);
    if (!hasLocalizedContentType(model)) {
      return wrappedParams;
    }
    return wrapParams(params, ctx);
  },

  async findOne(uid, id, parameters = {}) {
    // const { syncLocalizations, syncNonLocalizedAttributes } = getService('localizations');
    /*
    const { hasLocalizedContentType } = getService('contentTypes');
    if (!hasLocalizedContentType(model)) {
      return service.create.call(this, uid, parameters);
    }
    */

    // const { data } = parameters;
    // await assignValidLocale(data);

    const isLocalized = (attribute) => {
      return attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales;
    };

    const getFlatLocalizedAttributes = (schema) => {
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

    const deserialize = (rawValue) => {
      if (rawValue) {
        try {
          return JSON.parse(rawValue);
        } catch (error) {
          return {};
        }
      }
      return {};
    };

    const getValueForLocale_json = (rawValue, validLocale, defaultLocale) => {
      const parsedValue = deserialize(rawValue);
      // console.log('parsedValue', rawValue, parsedValue, validLocale, defaultLocale);
      return parsedValue[validLocale] || parsedValue[defaultLocale] || parsedValue[Object.keys(parsedValue)[0]];
    };

    const getValueForLocale = (jsonValue, validLocale, defaultLocale) => {
      // console.log('jsonValue', jsonValue, validLocale, defaultLocale);
      return jsonValue[validLocale] || jsonValue[defaultLocale] || jsonValue[Object.keys(jsonValue)[0]];
    };

    const entry = await service.findOne.call(this, uid, id, parameters);

    if (!parameters.locale) {
      return entry;
    }

    const locale = parameters.locale;
    delete parameters.locale;

    const model = strapi.getModel(uid);
    const localizedAttributes = getFlatLocalizedAttributes(model);

    const hasLocale = localizedAttributes.length > 0;
    if (!hasLocale) {
      return entry;
    }

    const localeService = getService('locales');
    const defaultLocale = await localeService.getDefaultLocale();

    const validLocale = await localeService.findByCode(locale);
    if (!validLocale) {
      return entry;
    }

    // console.log('entry', entry);

    const parseAttributes = (attributes, entry) => {
      if (!entry) {
        return;
      }
      attributes.forEach(attribute => {
        const key = attribute.key;
        if (Array.isArray(attribute.attribute)) {
          parseAttributes(attribute.attribute, entry[key]);
        } else {
          entry[key] = getValueForLocale(entry[key], validLocale.code, defaultLocale);
        }
      });
    }

    parseAttributes(localizedAttributes, entry);

    // console.log(entry, localizedAttributes, hasLocale);

    // console.log('localizedAttributes', localizedAttributes);
    // console.log('entityServiceDecorator.findOne', uid, id, parameters);

    // await syncLocalizations(entry, { model });
    // await syncNonLocalizedAttributes(entry, { model });
    return entry;
  },

  /**
   * Creates an entry & make links between it and its related localizations
   * @param {string} uid - Model uid
   * @param {object} opts - Query options object (params, data, files, populate)
   */
  async create(uid, opts = {}) {
    const model = strapi.getModel(uid);
    console.log('create', uid, model);
    const { syncLocalizations, syncNonLocalizedAttributes } = getService('localizations');
    const { hasLocalizedContentType } = getService('contentTypes');

    if (!hasLocalizedContentType(model)) {
      return service.create.call(this, uid, opts);
    }

    const { data } = opts;
    await assignValidLocale(data);

    const entry = await service.create.call(this, uid, opts);

    await syncLocalizations(entry, { model });
    await syncNonLocalizedAttributes(entry, { model });
    return entry;
  },

  /**
   * Updates an entry & update related localizations fields
   * @param {string} uid
   * @param {string} entityId
   * @param {object} opts - Query options object (params, data, files, populate)
   */
  async update(uid, entityId, opts = {}) {
    const model = strapi.getModel(uid);
    console.log('update', uid, entityId);
    const { syncNonLocalizedAttributes } = getService('localizations');
    const { hasLocalizedContentType } = getService('contentTypes');

    if (!hasLocalizedContentType(model)) {
      return service.update.call(this, uid, entityId, opts);
    }

    const { data, ...restOptions } = opts;

    const entry = await service.update.call(this, uid, entityId, {
      ...restOptions,
      data: omit(['locale', 'localizations'], data),
    });

    await syncNonLocalizedAttributes(entry, { model });
    return entry;
  },
});

module.exports = () => ({
  decorator,
  wrapParams,
});
