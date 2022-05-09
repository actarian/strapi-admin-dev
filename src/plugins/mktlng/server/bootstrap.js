'use strict';

const { getService } = require('./utils');

module.exports = async ({ strapi }) => {
  const entityService = getService('entityService');
  const { sendDidInitializeEvent } = getService('metrics');
  const { initDefaultLocale } = getService('locales');
  const { initDefaultMarket } = getService('markets');

  // Data
  await initDefaultLocale();
  await initDefaultMarket();

  // Entity Service
  // decorate global api calls with by locale and by market selector
  strapi.entityService.decorate(entityService.decorator);

  const permissionService = getService('permissions');

  // Builder Permissions
  permissionService.builder.registerLocalesPropertyHandler();

  // Actions Permissions
  await permissionService.actions.registerActions();
  permissionService.actions.registerActionsHooks();
  permissionService.actions.updateActionsProperties();

  // Engine Permissions
  permissionService.engine.registerPermissionsHandlers();

  // Hooks & Models
  dbLifecyclesSubscribe();

  sendDidInitializeEvent();
};

const dbLifecyclesSubscribe = () => {

  const ids = Object.values(strapi.contentTypes)
    .filter(contentType => getService('contentTypes').hasLocalizedContentType(contentType))
    .map(contentType => contentType.uid);

  console.log('dbLifecyclesSubscribe', 'localized contentTypes ids', ids);

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

  strapi.db.lifecycles.subscribe({
    models: ['plugin::mktlng.country'],
    async afterCreate() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithCountries();
    },
    async afterDelete() {
      await getService('permissions').actions.syncSuperAdminPermissionsWithCountries();
    },
  });

  // !!! ignored

  if (ids.length > 0) {
    strapi.db.lifecycles.subscribe({
      models: ids,
      async beforeCreate(event) {
        await getService('localizations').assignDefaultLocale(event.params.data);
      },
    });
  }

};
