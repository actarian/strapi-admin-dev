'use strict';

const { getService } = require('./utils');

module.exports = async ({ strapi }) => {
  const { decorator } = getService('entity-service-decorator');
  const { sendDidInitializeEvent } = getService('metrics');
  const { sectionsBuilder, actions, engine } = getService('permissions');
  const { initDefaultLocale } = getService('locales');
  const { initDefaultMarket } = getService('markets');

  // Data
  await initDefaultLocale();
  await initDefaultMarket();

  // Entity Service
  // decorate global api calls with by locale and by market selector
  strapi.entityService.decorate(decorator);

  // Sections Builder
  sectionsBuilder.registerLocalesPropertyHandler();

  // Actions
  await actions.registerActions();
  actions.registerActionsHooks();
  actions.updateActionsProperties();

  // Engine/Permissions
  engine.registerPermissionsHandlers();

  // Hooks & Models
  dbLifecyclesSubscribe();

  sendDidInitializeEvent();
};

const dbLifecyclesSubscribe = () => {

  const ids = Object.values(strapi.contentTypes)
    .filter(contentType => getService('content-types').hasLocalizedContentType(contentType))
    .map(contentType => contentType.uid);

  console.log('dbLifecyclesSubscribe', 'localized contentTypes ids', ids);

  if (ids.length > 0) {
    strapi.db.lifecycles.subscribe({
      models: ids,
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

  strapi.db.lifecycles.subscribe({
    models: ['plugin::mktlng.market'],
    async afterCreate() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithMarkets();
    },
    async afterDelete() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithMarkets();
    },
  });
};
