'use strict';

const url = require('url');

const { getSeoService } = require('../utils');

/*
function getContentTypes(ctx) {
  ctx.body = getSeoService().getContentTypes();
}
*/

function getPageContentTypes() {
  const contentTypes = strapi.contentTypes;
  let collectionTypes = [];
  let singleTypes = [];
  Object.keys(contentTypes).forEach((key) => {
    const contentType = contentTypes[key];
    const hasPageComponent = contentType.attributes && contentType.attributes.meta && contentType.attributes.meta.component;
    if (hasPageComponent && key.includes('api::')) {
      // console.log(contentType);
      const type = {
        uid: contentType.uid,
        apiName: contentType.apiName,
        singularName: contentType.info.singularName,
        pluralName: contentType.info.pluralName,
        globalId: contentType.globalId,
        kind: contentType.kind,
        // attributes: contentType.attributes,
        // contentType,
      };
      contentType.kind === 'collectionType' ? collectionTypes.push(type) : singleTypes.push(type);
    }
  });
  return { collectionTypes, singleTypes } || null;
}

async function getPages(ctx) {
  // console.log('getPages', ctx.params);
  const queryParams = url.parse(ctx.request.url, true).query;
  // console.log('getPages', queryParams.locale);
  // const contentTypes = getSeoService().getContentTypes();
  const contentTypes = getPageContentTypes();
  // console.log(contentTypes);
  let pages = [];

  async function collectItems(contentType) {
    const items = await strapi.query(contentType.uid).findMany({ ...queryParams }); // ({ populate: ['localizations'] })
    items.forEach(item => item.contentType = contentType);
    pages = pages.concat(items);
  };

  async function collectEntries(contentType) {
    console.log('collectEntries', contentType.uid);
    let entries = await strapi.entityService.findMany(contentType.uid, { ...queryParams }) || [];
    entries.forEach(entry => entry.contentType = contentType);
    pages = pages.concat(entries);
  };

  async function collectEntry(contentType) {
    console.log('collectEntry', contentType.uid);
    const entry = await strapi.entityService.findMany(contentType.uid, { ...queryParams });
    if (entry) {
      entry.contentType = contentType;
      pages.push(entry);
    }
  };

  await Promise.all(contentTypes.collectionTypes.map(collectEntries));
  await Promise.all(contentTypes.singleTypes.map(collectEntry));

  // console.log(pages);

  ctx.body = pages;
}

async function getPageBySlug(ctx) {
  const { slug } = ctx.params;
  // console.log('getPages', ctx.params);
  const queryParams = url.parse(ctx.request.url, true).query;
  // console.log('getPages', queryParams.locale);
  // const contentTypes = getSeoService().getContentTypes();
  const contentTypes = getPageContentTypes();
  // console.log(contentTypes);
  let pages = [];

  async function collectItems(contentType) {
    const items = await strapi.query(contentType.uid).findMany({ ...queryParams }); // ({ populate: ['localizations'] })
    items.forEach(item => item.contentType = contentType);
    pages = pages.concat(items);
  };

  async function collectEntries(contentType) {
    console.log('collectEntries', contentType.uid);
    let entries = await strapi.entityService.findMany(contentType.uid, { ...queryParams }) || [];
    entries.forEach(entry => entry.contentType = contentType);
    pages = pages.concat(entries);
  };

  async function collectEntry(contentType) {
    console.log('collectEntry', contentType.uid);
    const entry = await strapi.entityService.findMany(contentType.uid, { ...queryParams });
    if (entry) {
      entry.contentType = contentType;
      pages.push(entry);
    }
  };

  await Promise.all(contentTypes.collectionTypes.map(collectEntries));
  await Promise.all(contentTypes.singleTypes.map(collectEntry));

  console.log('getPageBySlug', pages);

  const page = pages.find(page => (page.slug || '') === (slug || ''));

  if (page) {
    ctx.body = {
      id: page.id,
      slug: page.slug,
      attributes: page,
      contentType: page.contentType,
    };
  } else {
    ctx.send({ error: 'page.notFound' }, 404);
  }
}

async function updateContentType(ctx) {
  const { uid } = ctx.params;
  const { body } = ctx.request;

  const contentType = strapi.contentTypes[uid];
  if (!contentType) {
    return ctx.send({ error: 'contentType.notFound' }, 404);
  }

  console.log('updateContentType.contentType', uid);

  /*
  // !!! skip validation
  try {
    await validateUpdateContentTypeInput(body);
  } catch (error) {
    return ctx.send({ error }, 400);
  }
  */

  try {
    strapi.reload.isWatching = false;

    const contentTypeBuilder = strapi.plugin('content-type-builder');
    const contentTypesService = contentTypeBuilder.service('content-types');

    console.log('contentTypesService', contentTypesService);

    const schema = await contentTypesService.editContentType(uid, {
      contentType: body,
    });

    /*
    const schema = await request(`/content-type-builder/content-type/${uid}`, { method: 'PUT', body: {
      contentType: body,
      components: [],
    } }, true);
    */

    setImmediate(() => strapi.reload());

    ctx.send({ data: { uid: schema.uid } }, 201);

  } catch (error) {

    strapi.log.error(error);
    ctx.send({ error: error.message }, 400);

  }
}

module.exports = {
  getPages,
  getPageBySlug,
  updateContentType,
};
