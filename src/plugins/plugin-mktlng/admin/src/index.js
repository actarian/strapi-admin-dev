import { prefixPluginTranslations } from '@strapi/helper-plugin';
import get from 'lodash/get';
import * as yup from 'yup';
import pluginPkg from '../../package.json';
import CheckboxConfirmation from './components/CheckboxConfirmation';
import CMEditViewInjectedComponents from './components/CMEditViewInjectedComponents';
import DeleteModalAdditionalInfos from './components/CMListViewInjectedComponents/DeleteModalAdditionalInfos';
import Initializer from './components/Initializer';
import LocalePicker from './components/LocalePicker';
import addColumnToTableHook from './contentManagerHooks/addColumnToTable';
import addLocaleToCollectionTypesLinksHook from './contentManagerHooks/addLocaleToCollectionTypesLinks';
import addLocaleToSingleTypesLinksHook from './contentManagerHooks/addLocaleToSingleTypesLinks';
import mutateEditViewLayoutHook from './contentManagerHooks/mutateEditViewLayout';
import mktlngReducers from './hooks/reducers';
import middlewares from './middlewares';
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
    // Hooks that mutate the collection types links in order to add the locale filter
    app.registerHook(
      'Admin/CM/pages/App/mutate-collection-types-links',
      addLocaleToCollectionTypesLinksHook
    );
    app.registerHook(
      'Admin/CM/pages/App/mutate-single-types-links',
      addLocaleToSingleTypesLinksHook
    );
    // Hook that adds a column into the CM's LV table
    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addColumnToTableHook);
    // Hooks that mutates the edit view layout
    app.registerHook('Admin/CM/pages/EditView/mutate-edit-view-layout', mutateEditViewLayoutHook);
    // Add the settings link
    app.addSettingsLink('global', {
      intlLabel: {
        id: getTrad('plugin.name'),
        defaultMessage: 'Markets & Languages',
      },
      id: 'markets-languages',
      to: '/settings/markets-languages',

      Component: async () => {
        const component = await import(
          /* webpackChunkName: "mktlng-settings-page" */ './pages/SettingsPage'
        );

        return component;
      },
      permissions: pluginPermissions.accessMain,
    });

    app.injectContentManagerComponent('editView', 'informations', {
      name: 'mktlng-locale-filter-edit-view',
      Component: CMEditViewInjectedComponents,
    });

    app.injectContentManagerComponent('listView', 'actions', {
      name: 'mktlng-locale-filter',
      Component: LocalePicker,
    });

    app.injectContentManagerComponent('listView', 'deleteModalAdditionalInfos', {
      name: 'mktlng-delete-bullets-in-modal',
      Component: DeleteModalAdditionalInfos,
    });

    const ctbPlugin = app.getPlugin('content-type-builder');

    if (ctbPlugin) {
      const ctbFormsAPI = ctbPlugin.apis.forms;
      ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
      ctbFormsAPI.components.add({ id: 'checkboxConfirmation', component: CheckboxConfirmation });

      ctbFormsAPI.extendContentType({
        validator: () => ({
          mktlng: yup.object().shape({
            localized: yup.bool(),
          }),
        }),
        form: {
          advanced() {
            return [
              {
                name: 'pluginOptions.mktlng.localized',
                description: {
                  id: getTrad('plugin.schema.mktlng.localized.description-content-type'),
                  defaultMessage: 'Allow you to have content in different locales',
                },
                type: 'checkboxConfirmation',
                intlLabel: {
                  id: getTrad('plugin.schema.mktlng.localized.label-content-type'),
                  defaultMessage: 'Enable localization for this Content-Type',
                },
              },
            ];
          },
        },
      });

      ctbFormsAPI.extendFields(LOCALIZED_FIELDS, {
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
            if (forTarget !== 'contentType') {
              return [];
            }

            const hasMktlngEnabled = get(
              contentTypeSchema,
              ['schema', 'pluginOptions', 'mktlng', 'localized'],
              false
            );

            if (!hasMktlngEnabled) {
              return [];
            }

            if (type === 'component' && step === '1') {
              return [];
            }

            return [
              {
                name: 'pluginOptions.mktlng.localized',
                description: {
                  id: getTrad('plugin.schema.mktlng.localized.description-field'),
                  defaultMessage: 'The field can have different values in each locale',
                },
                type: 'checkbox',
                intlLabel: {
                  id: getTrad('plugin.schema.mktlng.localized.label-field'),
                  defaultMessage: 'Enable localization for this field',
                },
              },
            ];
          },
        },
      });
    }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(
          /* webpackChunkName: "mktlng-translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
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
