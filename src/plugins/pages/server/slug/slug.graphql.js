const _ = require('lodash');
const { getPluginService, hasRequiredModelScopes, sanitizeOutput } = require('../utils');
const { isValidFindSlugParams } = require('./slug.utils');

function getResolversConfig() {
  return {
    Query: {
      findSlug: {
        auth: {
          scope: 'plugin::slugify.slugController.findSlug',
        },
      },
    },
  };
}

function getCustomTypes(strapi, nexus) {
  const { naming } = getPluginService(strapi, 'utils', 'graphql');
  const { toEntityResponse } = getPluginService(strapi, 'format', 'graphql').returnTypes;
  // const { models } = getPluginService(strapi, 'settingsService').get();
  const { getEntityResponseName } = naming;

  const contentTypes = {};
  _.forEach(strapi.contentTypes, (value, key) => {
    if (value.attributes && value.attributes.slug) {
      contentTypes[key] = value;
    }
  });
  console.log(contentTypes);

  // get all types required for findSlug query
  let findSlugTypes = {
    response: [],
  };
  _.forEach(contentTypes, (value, key) => {
    // if (models[key]) {
    findSlugTypes.response.push(getEntityResponseName(value));
    // }
  });

  // ensure we have at least one type before attempting to register
  if (!findSlugTypes.response.length) {
    return [];
  }

  // build custom union type based on defined models
  const FindSlugResponse = nexus.unionType({
    name: 'FindSlugResponse',
    description: 'Union Type of all registered slug content types',
    definition(t) {
      t.members(...findSlugTypes.response);
    },
    resolveType: (ctx) => {
      return getEntityResponseName(contentTypes[ctx.info.resourceUID]);
      // return getEntityResponseName(models[ctx.info.resourceUID].contentType);
    },
  });

  return [
    FindSlugResponse,
    nexus.extendType({
      type: 'Query',
      definition: (t) => {
        t.field('findSlug', {
          type: FindSlugResponse,
          args: {
            modelName: nexus.stringArg('The model name of the content type'),
            slug: nexus.stringArg('The slug to query for'),
            publicationState: nexus.stringArg('The publication state of the entry'),
          },
          resolve: async (_parent, args, ctx) => {
            // const { models } = getPluginService(strapi, 'settingsService').get();
            const { modelName, slug, publicationState } = args;
            const { auth } = ctx.state;
            isValidFindSlugParams({ modelName, slug, contentTypes, publicationState });
            const { uid, field, contentType } = contentTypes[modelName]; // models[modelName];
            await hasRequiredModelScopes(strapi, uid, auth);
            // build query
            let query = {
              filters: {
                [field]: slug,
              },
            };
            // only return published entries by default if content type has draftAndPublish enabled
            if (_.get(contentType, ['options', 'draftAndPublish'], false)) {
              query.publicationState = publicationState || 'live';
            }
            const data = await getPluginService(strapi, 'slugService').findOne(uid, query);
            const sanitizedEntity = await sanitizeOutput(data, contentType, auth);
            return toEntityResponse(sanitizedEntity, { resourceUID: uid });
          },
        });
      },
    }),
  ];
};

module.exports = {
  getResolversConfig,
  getCustomTypes,
};
