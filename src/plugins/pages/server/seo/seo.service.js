'use strict';

const _ = require('lodash');
const fetch = require('node-fetch');

const metaSchema_ = require('../meta/meta.json');
const metaSocialSchema_ = require('../meta/meta-social.json');
const metaLocalizedSchema_ = require('../meta/meta-localized.json');
const metaSocialLocalizedSchema_ = require('../meta/meta-social-localized.json');

module.exports = ({ strapi }) => ({

  getMetaComponent() {
    const metaComponent = strapi.components['page.meta'];
    return metaComponent ? { attributes: metaComponent.attributes, category: metaComponent.category } : null;
  },

  getContentTypes() {
    const contentTypes = strapi.contentTypes;
    let collectionTypes = [];
    let singleTypes = [];
    Object.keys(contentTypes).forEach((key) => {
      const contentType = contentTypes[key];
      const hasPageSeoComponent = contentType.attributes && contentType.attributes.meta && contentType.attributes.meta.component;
      if (key.includes('api::')) {
        const type = {
          meta: hasPageSeoComponent ? true : false,
          uid: contentType.uid,
          kind: contentType.kind,
          globalId: contentType.globalId,
          attributes: contentType.attributes,
          contentType,
        };
        contentType.kind === 'collectionType' ? collectionTypes.push(type) : singleTypes.push(type);
      }
    });
    return { collectionTypes, singleTypes } || null;
  },

  async createSeoComponent() {
    const mktlng = strapi.plugin('mktlng');
    const metaSchema = mktlng ? metaLocalizedSchema_ : metaSchema_;
    const metaSocialSchema = mktlng ? metaSocialLocalizedSchema_ : metaSocialSchema_;
    const metaComponent = await this.getMetaComponent();
    if (!metaComponent) {
      if (metaSchema && metaSocialSchema) {
        try {
          const res = await strapi.plugin('content-type-builder').services.components.createComponent({
            component: {
              category: 'page',
              displayName: metaSchema.info.displayName,
              icon: metaSchema.info.icon,
              attributes: metaSchema.attributes,
            },
            components: [{
              tmpUID: 'page.meta-social',
              category: 'page',
              displayName: metaSocialSchema.info.displayName,
              icon: metaSocialSchema.info.icon,
              attributes: metaSocialSchema.attributes,
            }],
          });
          return res;
        } catch (error) {
          console.log(error);
        }
      } else {
        return null;
      }
    }
  },
});
