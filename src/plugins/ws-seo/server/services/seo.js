'use strict';

const _ = require('lodash');
const fetch = require('node-fetch');

const metaContent = require('../components/meta.json');
const metaSocialContent = require('../components/meta-social.json');

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
    const metaComponent = await this.getMetaComponent();
    if (!metaComponent) {
      if (metaSocialContent && metaContent) {
        try {
          const res = await strapi.plugin('content-type-builder').services.components.createComponent({
            component: {
              category: 'page',
              displayName: metaContent.info.displayName,
              icon: metaContent.info.icon,
              attributes: metaContent.attributes,
            },
            components: [{
              tmpUID: 'page.meta-social',
              category: 'page',
              displayName: metaSocialContent.info.displayName,
              icon: metaSocialContent.info.icon,
              attributes: metaSocialContent.attributes,
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
