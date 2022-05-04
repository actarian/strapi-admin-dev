'use strict';

function getContentType(model) {
  const contentType = {
    uid: model.uid,
    apiName: model.apiName,
    globalId: model.globalId,
    kind: model.kind,
    pluralName: model.info.pluralName,
    singularName: model.info.singularName,
  };
  return contentType;
}

const decorator = (service) => ({

  async findMany(uid, parameters = {}) {
    let entries = await service.findMany.call(this, uid, parameters);
    if (!entries) {
      return entries;
    }
    const model = strapi.getModel(uid);
    // console.log('page.entityService.findMany', model);
    if (model.modelType !== 'contentType') {
      return entries;
    }
    if (model.attributes && model.attributes.meta) {
      const contentType = getContentType(model);
      model.kind === 'collectionType' ? entries.forEach(entry => entry.contentType = contentType) : entries.contentType = contentType;
    }
    console.log('page.entityService.findMany', parameters.page);
    if (!parameters.page) {
      return entries;
    }
    delete parameters.page;
    return entries;
  },

  async findOne(uid, id, parameters = {}) {
    let entry = await service.findOne.call(this, uid, id, parameters);
    if (!entry) {
      return entry;
    }
    const model = strapi.getModel(uid);
    // console.log('page.entityService.findMany', model);
    if (model.modelType !== 'contentType') {
      return entries;
    }
    if (model.attributes && model.attributes.meta) {
      const contentType = getContentType(model);
      entry.contentType = contentType;
    }
    console.log('page.entityService.findOne', parameters.page);
    if (!parameters.page) {
      return entry;
    }
    delete parameters.page;
    return entry;
  },

});

module.exports = () => ({
  decorator,
});
