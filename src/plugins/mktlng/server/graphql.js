'use strict';

const { prop, propEq, identity, merge } = require('lodash/fp');
const { ValidationError } = require('@strapi/utils').errors;

const COUNTRY_SCALAR_TYPENAME = 'MktlngCountryCode';
const LOCALE_SCALAR_TYPENAME = 'MktlngLocaleCode';
const MARKET_SCALAR_TYPENAME = 'MktlngMarketCode';

const LOCALE_ARG_PLUGIN_NAME = 'MktlngLocaleArg';
const MARKET_ARG_PLUGIN_NAME = 'MktlngMarketArg';

const getLocalizedTypesFromRegistry = ({ strapi, typeRegistry }) => {
  const { KINDS } = strapi.plugin('graphql').service('constants');
  const { hasLocalizedContentType } = strapi.plugin('mktlng').service('contentTypes');
  return typeRegistry.where(
    ({ config }) => config.kind === KINDS.type && hasLocalizedContentType(config.contentType)
  );
};

module.exports = ({ strapi }) => ({
  register() {
    const graphqlPlugin = strapi.plugin('graphql');
    const mktlngPlugin = strapi.plugin('mktlng');

    const { hasLocalizedContentType } = mktlngPlugin.service('contentTypes');
    const extensionService = graphqlPlugin.service('extension');

    const getCreateLocalizationMutationType = contentType => {
      const { getTypeName } = graphqlPlugin.service('utils').naming;
      return `create${getTypeName(contentType)}Localization`;
    };

    extensionService.shadowCRUD('plugin::mktlng.locale').disableMutations();
    extensionService.shadowCRUD('plugin::mktlng.market').disableMutations();

    // Disable unwanted fields for localized content types
    Object.entries(strapi.contentTypes).forEach(([uid, contentType]) => {
      if (hasLocalizedContentType(contentType)) {
        // !!! non esiste
        // Disable locale field in localized inputs
        extensionService.shadowCRUD(uid).field('locale').disableInput();

        // !!! esiste non disabilitarlo
        // Disable market field in localized inputs
        extensionService.shadowCRUD(uid).field('market').disableInput();

        // !!! non esiste
        // Disable localizations field in localized inputs
        extensionService.shadowCRUD(uid).field('localizations').disableInput();
      }
    });

    extensionService.use(({ nexus, typeRegistry }) => {
      const countryScalar = getCountryScalar({ nexus });
      const localeScalar = getLocaleScalar({ nexus });
      const marketScalar = getMarketScalar({ nexus });

      const localePlugin = getLocalePlugin({ nexus, typeRegistry });
      const marketPlugin = getMarketPlugin({ nexus, typeRegistry });

      const { mutations: createLocalizationMutations, resolversConfig: createLocalizationResolversConfig } = getCreateLocalizationMutations({ nexus, typeRegistry });

      return {
        plugins: [localePlugin, marketPlugin],
        types: [countryScalar, localeScalar, marketScalar, createLocalizationMutations],
        resolversConfig: {
          // Auth for createLocalization mutations
          ...createLocalizationResolversConfig,
          // locale arg transformation for localized createEntity mutations
          ...getLocalizedCreateMutationsResolversConfigs({ typeRegistry }),
        },
      };
    });

    const getCreateLocalizationMutations = ({ nexus, typeRegistry }) => {
      const localizedContentTypes = getLocalizedTypesFromRegistry({ strapi, typeRegistry }).map(
        prop('config.contentType')
      );
      const createLocalizationComponents = localizedContentTypes.map(ct =>
        getCreateLocalizationComponents(ct, { nexus })
      );
      // Extract & merge each resolverConfig into a single object
      const resolversConfig = createLocalizationComponents.map(prop('resolverConfig')).reduce(merge, {});
      const mutations = createLocalizationComponents.map(prop('mutation'));
      return { mutations, resolversConfig };
    };

    const getCreateLocalizationComponents = (contentType, { nexus }) => {
      const { getEntityResponseName, getContentTypeInputName } = graphqlPlugin.service('utils').naming;
      const { createCreateLocalizationHandler } = mktlngPlugin.service('coreApi');
      const responseType = getEntityResponseName(contentType);
      const mutationName = getCreateLocalizationMutationType(contentType);
      const resolverHandler = createCreateLocalizationHandler(contentType);
      const mutation = nexus.extendType({
        type: 'Mutation',
        definition(t) {
          t.field(mutationName, {
            type: responseType,
            // The locale arg will be automatically added through the mktlng graphql extension
            args: { id: 'ID', data: getContentTypeInputName(contentType) },
            async resolve(parent, args) {
              const { id, locale, data } = args;
              const ctx = { id, data: { ...data, locale } };
              const value = await resolverHandler(ctx);
              return { value, info: { args, resourceUID: contentType.uid } };
            },
          });
        },
      });
      const resolverConfig = {
        [`Mutation.${mutationName}`]: {
          auth: {
            scope: [`${contentType.uid}.createLocalization`],
          },
        },
      };
      return { mutation, resolverConfig };
    };

    const getLocalizedCreateMutationsResolversConfigs = ({ typeRegistry }) => {
      const localizedCreateMutationsNames = getLocalizedTypesFromRegistry({ strapi, typeRegistry }).map(prop('config.contentType')).map(graphqlPlugin.service('utils').naming.getCreateMutationTypeName);
      return localizedCreateMutationsNames.reduce((p, mutationName) => ({
        ...p,
        [`Mutation.${mutationName}`]: {
          middlewares: [
            // Set data's locale using args' locale
            (resolve, parent, args, context, info) => {
              args.data.locale = args.locale;
              return resolve(parent, args, context, info);
            },
          ],
        },
      }), {});
    };

    const getCountryScalar = ({ nexus }) => {
      const markets = mktlngPlugin.service('isoCountries').getIsoCountries();
      return nexus.scalarType({
        name: COUNTRY_SCALAR_TYPENAME,
        description: 'A string used to identify an mktlng market',
        serialize: identity,
        parseValue: identity,
        parseLiteral(ast) {
          if (ast.kind !== 'StringValue') {
            throw new ValidationError('Country cannot represent non string type');
          }
          const isValidCountry = ast.value === 'all' || markets.find(propEq('code', ast.value));
          if (!isValidCountry) {
            throw new ValidationError('Unknown market supplied');
          }
          return ast.value;
        },
      });
    };

    const getLocaleScalar = ({ nexus }) => {
      const locales = mktlngPlugin.service('isoLocales').getIsoLocales();
      return nexus.scalarType({
        name: LOCALE_SCALAR_TYPENAME,
        description: 'A string used to identify an mktlng locale',
        serialize: identity,
        parseValue: identity,
        parseLiteral(ast) {
          if (ast.kind !== 'StringValue') {
            throw new ValidationError('Locale cannot represent non string type');
          }
          const isValidLocale = ast.value === 'all' || locales.find(propEq('code', ast.value));
          if (!isValidLocale) {
            throw new ValidationError('Unknown locale supplied');
          }
          return ast.value;
        },
      });
    };

    const getMarketScalar = ({ nexus }) => {
      const markets = mktlngPlugin.service('isoMarkets').getIsoMarkets();
      return nexus.scalarType({
        name: MARKET_SCALAR_TYPENAME,
        description: 'A string used to identify an mktlng market',
        serialize: identity,
        parseValue: identity,
        parseLiteral(ast) {
          if (ast.kind !== 'StringValue') {
            throw new ValidationError('Market cannot represent non string type');
          }
          const isValidMarket = ast.value === 'all' || markets.find(propEq('code', ast.value));
          if (!isValidMarket) {
            throw new ValidationError('Unknown market supplied');
          }
          return ast.value;
        },
      });
    };

    const getLocalePlugin = ({ nexus, typeRegistry }) => {
      const { hasLocalizedContentType } = mktlngPlugin.service('contentTypes');
      const addLocaleArg = config => {
        const { parentType } = config;
        // Only target queries or mutations
        if (parentType !== 'Query' && parentType !== 'Mutation') {
          return;
        }
        const registryType = typeRegistry.get(config.type);
        if (!registryType) {
          return;
        }
        const contentType = registryType.config.contentType;
        // Ignore non-localized content types
        if (!hasLocalizedContentType(contentType)) {
          return;
        }
        config.args.locale = nexus.arg({ type: LOCALE_SCALAR_TYPENAME });
      };
      return nexus.plugin({
        name: LOCALE_ARG_PLUGIN_NAME,
        onAddOutputField(config) {
          // Add the locale arg to the queries on localized CTs
          addLocaleArg(config);
        },
      });
    };

    const getMarketPlugin = ({ nexus, typeRegistry }) => {
      const { hasLocalizedContentType } = mktlngPlugin.service('contentTypes');
      const addMarketArg = config => {
        const { parentType } = config;
        // Only target queries or mutations
        if (parentType !== 'Query' && parentType !== 'Mutation') {
          return;
        }
        const registryType = typeRegistry.get(config.type);
        if (!registryType) {
          return;
        }
        const contentType = registryType.config.contentType;
        // Ignore non-localized content types
        if (!hasLocalizedContentType(contentType)) {
          return;
        }
        config.args.market = nexus.arg({ type: MARKET_SCALAR_TYPENAME });
      };
      return nexus.plugin({
        name: MARKET_ARG_PLUGIN_NAME,
        onAddOutputField(config) {
          // Add the market arg to the queries on localized CTs
          addMarketArg(config);
        },
      });
    };
  },
});
