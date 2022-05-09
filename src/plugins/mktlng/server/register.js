'use strict';

const _ = require('lodash');

const validateLocaleCreation = require('./locale/locale.validator');
const { getService } = require('./utils');
const contentTypeMigrations = require('./contentType/contentType.migrations');

module.exports = ({ strapi }) => {

  const localizedContentTypes = Object.values(strapi.contentTypes).filter(x => Object.values(x.attributes).find(a => a.pluginOptions && a.pluginOptions.mktlng && a.pluginOptions.mktlng.locales));
  const localizedComponents = Object.values(strapi.components).filter(x => Object.values(x.attributes).find(a => a.pluginOptions && a.pluginOptions.mktlng && a.pluginOptions.mktlng.locales));

  const localizedContentTypeIds = localizedContentTypes.map(x => x.uid);
  const localizedComponentIds = localizedComponents.map(x => x.uid);

  // console.log('server.register.extendLocalizedContentTypes', localizedContentTypeIds, localizedComponentIds);

  /*
  localizedContentTypes.forEach((schema) => {
    Object.values(schema.attributes).forEach((attribute) => {
      if (attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales) {
        console.log('server.register.extendLocalizedContentTypes', attribute);
        attribute.customField = {
          type: 'localizedText',
          forType: attribute.customField ? attribute.customField.forType : attribute.type,
        };
        attribute.type = 'text';
      }
    });
  });
  */

  // !!! remapping components
  /*
  localizedComponents.forEach((schema) => {
    Object.values(schema.attributes).forEach((attribute) => {
      if (attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales) {
        console.log('server.register.extendLocalizedContentTypes', attribute);
        attribute.customField = {
          type: 'localizedText',
          forType: attribute.customField ? attribute.customField.forType : attribute.type,
        };
        // !!! leaving original type
        // attribute.type = 'json';
      }
    });
  });
  */

  const contentTypeService = getService('contentTypes');
  const coreApiService = getService('coreApi');

  Object.values(strapi.contentTypes).forEach((contentType) => {
    // console.log('server.register.contentType', contentType.kind, contentType.collectionName, /*.info.displayName*/);
    // !!! ignored
    if (contentTypeService.hasLocalizedContentType(contentType)) {
      const { attributes } = contentType;

      Object.values(attributes).forEach((attribute) => {

        attribute.localizations = {
          writable: true,
          private: false,
          configurable: false,
          visible: false,
          type: 'relation',
          relation: 'oneToMany',
          target: contentType.uid,
        };

        attribute.locale = {
          writable: true,
          private: false,
          configurable: false,
          visible: false,
          type: 'string',
        };

        attribute.market = {
          writable: true,
          private: false,
          configurable: false,
          visible: false,
          type: 'string',
        };

      });

      coreApiService.addCreateLocalizationAction(contentType);
    }
  });

  if (strapi.plugin('graphql')) {
    require('./graphql')({ strapi }).register();
  }

  strapi.server.router.use('/content-manager/collection-types/:model', (ctx, next) => {
    if (ctx.method === 'POST') {
      return validateLocaleCreation(ctx, next);
    }
    return next();
  });

  strapi.server.router.use('/content-manager/single-types/:model', (ctx, next) => {
    if (ctx.method === 'PUT') {
      return validateLocaleCreation(ctx, next);
    }
    return next();
  });

  strapi.hook('strapi::content-types.beforeSync').register(contentTypeMigrations.disable);
  strapi.hook('strapi::content-types.afterSync').register(contentTypeMigrations.enable);

};
