import { prefixPluginTranslations } from '@strapi/helper-plugin';
import get from 'lodash/get';
import * as yup from 'yup';
import pluginPkg from '../../package.json';
import CheckboxConfirmation from './components/CheckboxConfirmation';
import CMEditViewInjectedComponents from './components/CMEditViewInjectedComponents';
import DeleteModalAdditionalInfos from './components/CMListViewInjectedComponents/DeleteModalAdditionalInfos';
import Initializer from './components/Initializer/Initializer';
import LocalePicker from './components/LocalePicker';
import addColumnToTableHook from './contentManagerHooks/addColumnToTable';
import addLocaleToCollectionTypesLinksHook from './contentManagerHooks/addLocaleToCollectionTypesLinks';
import addLocaleToSingleTypesLinksHook from './contentManagerHooks/addLocaleToSingleTypesLinks';
import mutateEditViewLayoutHook from './contentManagerHooks/mutateEditViewLayout';
import mktlngReducers from './hooks/reducers';
import middlewares from './middlewares/middlewares';
import pluginPermissions from './permissions';
import pluginId from './pluginId';
import { getTrad } from './utils';
import LOCALIZED_FIELDS from './utils/localizedFields';
import mutateCTBContentTypeSchema from './utils/mutateCTBContentTypeSchema';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMiddlewares(middlewares);

    app.addReducers(mktlngReducers);

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
  bootstrap(app) {
    // # hooks
    // hooks that mutate the collection types links in order to add the locale filter
    app.registerHook('Admin/CM/pages/App/mutate-collection-types-links', addLocaleToCollectionTypesLinksHook);
    // hooks that mutate the single types links in order to add the locale filter
    app.registerHook('Admin/CM/pages/App/mutate-single-types-links', addLocaleToSingleTypesLinksHook);
    // hook that adds a column into the CM's LV table
    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addColumnToTableHook);
    // hooks that mutates the edit view layout
    app.registerHook('Admin/CM/pages/EditView/mutate-edit-view-layout', mutateEditViewLayoutHook);

    // # settings
    // add the settings language link
    app.addSettingsLink('global', {
      intlLabel: { id: getTrad('settings.language.title'), defaultMessage: 'Languages' },
      id: 'mktlng',
      to: '/settings/language',
      Component: async () => {
        const component = await import(/* webpackChunkName: "mktlng-language-settings-page" */ './pages/LanguageSettingsPage/LanguageSettingsPage');
        console.log(component);
        return component;
      },
      permissions: pluginPermissions.accessMain,
    });

    // add the settings market link
    app.addSettingsLink('global', {
      intlLabel: { id: getTrad('settings.market.title'), defaultMessage: 'Markets' },
      id: 'mktlng',
      to: '/settings/market',
      Component: async () => {
        const component = await import(/* webpackChunkName: "mktlng-market-settings-page" */ './pages/MarketSettingsPage/MarketSettingsPage');
        console.log(component);
        return component;
      },
      permissions: pluginPermissions.accessMain,
    });

    // # content type builder
    const plugin = app.getPlugin('content-type-builder');
    if (plugin) {
      const forms = plugin.apis.forms;
      console.log('admin.bootstrap', app, plugin, forms, forms.addContentTypeSchemaMutation, mutateCTBContentTypeSchema);
      // # mutate schema
      forms.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
      // # add components
      forms.components.add({ id: 'checkboxConfirmation', component: CheckboxConfirmation });
      // # extend content type
      forms.extendContentType({
        validator: () => ({
          mktlng: yup.object().shape({
            localized: yup.bool(),
          }),
        }),
        form: {
          advanced(...args) {
            console.log('extendContentType', args);
            return [{
              type: 'checkboxConfirmation',
              name: 'pluginOptions.mktlng.localized',
              description: { id: getTrad('plugin.schema.mktlng.localized.description-content-type'), defaultMessage: 'Allow you to have content in different locales' },
              intlLabel: { id: getTrad('plugin.schema.mktlng.localized.label-content-type'), defaultMessage: 'Enable localization for this Content-Type' },
            }];
          },
        },
      });
      // # extend fields
      forms.extendFields(LOCALIZED_FIELDS, {
        validator: args => ({
          mktlng: yup.object().shape({
            localized: yup.bool().test({
              name: 'ensure-unique-localization',
              message: getTrad('plugin.schema.mktlng.ensure-unique-localization'),
              test(value) {
                if (value === undefined || value) {
                  return true;
                }
                const unique = get(args, ['3', 'modifiedData', 'unique'], null);
                // Unique fields must be localized
                if (unique && !value) {
                  return false;
                }
                return true;
              },
            }),
          }),
        }),
        form: {
          advanced({ contentTypeSchema, forTarget, type, step }) {
            console.log('extendFields', contentTypeSchema, forTarget, type, step);
            if (forTarget !== 'contentType') {
              return [];
            }
            const hasMktlngEnabled = get(contentTypeSchema, ['schema', 'pluginOptions', 'mktlng', 'localized'], false);
            if (!hasMktlngEnabled) {
              return [];
            }
            if (type === 'component' && step === '1') {
              return [];
            }
            return [{
              type: 'checkbox',
              name: 'pluginOptions.mktlng.localized',
              description: { id: getTrad('plugin.schema.mktlng.localized.description-field'), defaultMessage: 'The field can have different values in each locale' },
              intlLabel: { id: getTrad('plugin.schema.mktlng.localized.label-field'), defaultMessage: 'Enable localization for this field' },
            }];
          },
        },
      });
    }

    return;

    // # content manager
    // inject component in editView with injectionZoneApi
    app.injectContentManagerComponent('editView', 'informations', { name: 'mktlng-locale-filter-edit-view', Component: CMEditViewInjectedComponents, });
    // inject component in listView with injectionZoneApi
    app.injectContentManagerComponent('listView', 'actions', { name: 'mktlng-locale-filter', Component: LocalePicker, });
    // inject component in listView with injectionZoneApi
    app.injectContentManagerComponent('listView', 'deleteModalAdditionalInfos', { name: 'mktlng-delete-bullets-in-modal', Component: DeleteModalAdditionalInfos, });

  },
  // # register trads
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(
          /* webpackChunkName: "mktlng-translation-[request]" */ `./translations/${locale}.json`
        ).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale,
          };
        }).catch(() => {
          return {
            data: {},
            locale,
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  },
};
