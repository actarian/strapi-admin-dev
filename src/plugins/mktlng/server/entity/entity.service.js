'use strict';

const { has, omit, isArray } = require('lodash/fp');
const { getService } = require('../utils');

const LOCALE_QUERY_FILTER = 'locale';
const SINGLE_ENTRY_ACTIONS = ['findOne', 'update', 'delete'];
const BULK_ACTIONS = ['delete'];

function paramsContain(key, params) {
  return (has(key, params.filters) || (isArray(params.filters) && params.filters.some((clause) => has(key, clause))));
}

/**
 * Adds default locale or replaces locale by locale in query params
 * @param {object} params - query params
 * @param {object} ctx
 */
async function wrapParams(params = {}, ctx = {}) {
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
}

/**
 * Decorates the entity service with Mktlng business logic
 * @param {object} service - entity service
 */
const decorator = (service) => ({

  async findMany(uid, parameters = {}) {
    let entries = await service.findMany.call(this, uid, parameters);
    console.log('entityService.findMany', parameters.locale);
    if (!parameters.locale) {
      return entries;
    }
    const locale = parameters.locale;
    delete parameters.locale;
    const localeService = getService('locales');
    entries = await localeService.localizeEntries(entries, uid, locale);
    return entries;
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
    // const localeService = getService('locales');
    // await localeService.assignValidLocale(data);
    let entry = await service.findOne.call(this, uid, id, parameters);
    if (!parameters.locale) {
      return entry;
    }
    const locale = parameters.locale;
    delete parameters.locale;
    const localeService = getService('locales');
    entry = await localeService.localizeEntry(entry, uid, locale);
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
    const localeService = getService('locales');
    await localeService.assignValidLocale(data);

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

  /**
   * Wraps query options. In particular will add default locale to query params
   * @param {object} opts - Query options object (params, data, files, populate)
   * @param {object} ctx - Query context
   * @param {object} ctx.model - Model that is being used
   */
   async wrapParams(params = {}, ctx = {}) {
    // console.log('entityServiceDecorator.wrapParams', params, ctx);
    const wrappedParams = await service.wrapParams.call(this, params, ctx);
    const model = strapi.getModel(ctx.uid);
    const { hasLocalizedContentType } = getService('contentTypes');
    // console.log('entityServiceDecorator.wrapParams', params, wrappedParams);
    if (!hasLocalizedContentType(model)) {
      return wrappedParams;
    }
    return wrapParams(params, ctx);
  },

});

module.exports = () => ({
  decorator,
  wrapParams,
});
