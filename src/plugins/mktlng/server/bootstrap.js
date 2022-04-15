'use strict';

const { getService } = require('./utils');

module.exports = async ({ strapi }) => {
  const { sendDidInitializeEvent } = getService('metrics');
  const { decorator } = getService('entity-service-decorator');
  const { initDefaultLocale } = getService('locales');
  const { sectionsBuilder, actions, engine } = getService('permissions');

  // Entity Service
  strapi.entityService.decorate(decorator);

  // Data
  await initDefaultLocale();

  // Sections Builder
  sectionsBuilder.registerLocalesPropertyHandler();

  // Actions
  await actions.registerMktlngActions();
  actions.registerMktlngActionsHooks();
  actions.updateActionsProperties();

  // Engine/Permissions
  engine.registerMktlngPermissionsHandlers();

  // Hooks & Models
  registerModelsHooks();

  sendDidInitializeEvent();
};

const registerModelsHooks = () => {
  const mktlngModelUIDs = Object.values(strapi.contentTypes)
    .filter(contentType => getService('content-types').isLocalizedContentType(contentType))
    .map(contentType => contentType.uid);

  if (mktlngModelUIDs.length > 0) {
    strapi.db.lifecycles.subscribe({
      models: mktlngModelUIDs,
      async beforeCreate(event) {
        await getService('localizations').assignDefaultLocale(event.params.data);
      },
    });
  }

  strapi.db.lifecycles.subscribe({
    models: ['plugin::mktlng.locale'],

    async afterCreate() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithLocales();
    },

    async afterDelete() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithLocales();
    },
  });
};
