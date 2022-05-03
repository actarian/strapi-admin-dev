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
    const keys = Object.keys(contentTypes);
    let collectionTypes = [];
    let singleTypes = [];
    keys.forEach((name) => {
      const hasPageSeoComponent = _.get(contentTypes[name], 'attributes.meta.component', null);
      if (name.includes('api::')) {
        const object = {
          meta: hasPageSeoComponent ? true : false,
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
        };
        contentTypes[name].kind === 'collectionType'
          ? collectionTypes.push(object)
          : singleTypes.push(object);
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
