import { prefixPluginTranslations } from '@strapi/helper-plugin';
import get from 'lodash/get';
import * as yup from 'yup';
import pluginPkg from '../../package.json';
import { Initializer } from './components/Initializer/Initializer';
import { EditViewInformations } from './content-manager/edit-view/EditViewInformations/EditViewInformations';
import { injectColumnInTable } from './content-manager/injectColumnInTable';
import { DeleteModalAdditionalInfos } from './content-manager/list-view/DeleteModalAdditionalInfos/DeleteModalAdditionalInfos';
import { LocalePicker } from './content-manager/list-view/LocalePicker/LocalePicker';
import { mutateCollectionTypesLinks } from './content-manager/mutateCollectionTypesLinks';
import { mutateEditViewLayout } from './content-manager/mutateEditViewLayout';
import { mutateSingleTypesLinks } from './content-manager/mutateSingleTypesLinks';
import { componentSchemaMutation } from './content-type-builder/componentSchemaMutation';
import { contentTypeSchemaMutation } from './content-type-builder/contentTypeSchemaMutation';
import { CheckboxConfirmation } from './content-type-builder/custom-fields/CheckboxConfirmation/CheckboxConfirmation';
import { InputUID } from './content-type-builder/custom-fields/InputUID/InputUID';
import { LocalizedText } from './content-type-builder/custom-fields/LocalizedText/LocalizedText';
import { MarketSelector } from './content-type-builder/custom-fields/MarketSelector/MarketSelector';
import { middlewares } from './middlewares/middlewares';
import pluginPermissions from './permissions';
import pluginId from './pluginId';
import { reducers } from './reducers/reducers';
import { getTrad } from './utils';
import { LOCALIZED_FIELDS } from './utils/localizedFields';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMiddlewares(middlewares);

    app.addReducers(reducers);

    app.addFields([
      { type: 'localizedText', Component: LocalizedText },
      { type: 'marketSelector', Component: MarketSelector },
    ]);

    app.addFields({ type: 'uid', Component: InputUID });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.createSettingSection(
      { id: 'mktlng', intlLabel: { id: 'mktlng.plugin.name', defaultMessage: 'Localizations' } }, // Section to create
      [
        {
          intlLabel: { id: getTrad('settings.language.title'), defaultMessage: 'Languages' },
          id: 'mktlng',
          to: '/settings/language',
          Component: async () => {
            const component = await import(/* webpackChunkName: "mktlng-language-settings-page" */ './pages/LanguageSettingsPage/LanguageSettingsPage');
            // console.log(component);
            return component;
          },
          permissions: pluginPermissions.accessMain,
        },
        {
          intlLabel: { id: getTrad('settings.market.title'), defaultMessage: 'Markets' },
          id: 'mktlng',
          to: '/settings/market',
          Component: async () => {
            const component = await import(/* webpackChunkName: "mktlng-market-settings-page" */ './pages/MarketSettingsPage/MarketSettingsPage');
            // console.log(component);
            return component;
          },
          permissions: pluginPermissions.accessMain,
        },
      ]
    );

  },
  bootstrap(app) {
    // # hooks
    // hooks that mutate the collection types links in order to add the locale filter
    app.registerHook('Admin/CM/pages/App/mutate-collection-types-links', mutateCollectionTypesLinks);
    // hooks that mutate the single types links in order to add the locale filter
    app.registerHook('Admin/CM/pages/App/mutate-single-types-links', mutateSingleTypesLinks);
    // hook that adds a column into the CM's LV table
    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', injectColumnInTable);
    // hooks that mutates the edit view layout
    app.registerHook('Admin/CM/pages/EditView/mutate-edit-view-layout', mutateEditViewLayout);

    // # settings
    // add the settings language link
    /*
    app.addSettingsLink('global', {
      intlLabel: { id: getTrad('settings.language.title'), defaultMessage: 'Languages' },
      id: 'mktlng',
      to: '/settings/language',
      Component: async () => {
        const component = await import(/* webpackChunkName: "mktlng-language-settings-page" / './pages/LanguageSettingsPage/LanguageSettingsPage');
        // console.log(component);
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
        const component = await import(/* webpackChunkName: "mktlng-market-settings-page" / './pages/MarketSettingsPage/MarketSettingsPage');
        // console.log(component);
        return component;
      },
      permissions: pluginPermissions.accessMain,
    });
    */

    // # content type builder
    const plugin = app.getPlugin('content-type-builder');
    if (plugin) {
      const forms = plugin.apis.forms;

      // console.log('forms', forms);

      // # mutate schema
      forms.addContentTypeSchemaMutation(contentTypeSchemaMutation);
      forms.addComponentSchemaMutation(componentSchemaMutation);

      // # add components
      forms.components.add({ id: 'checkboxConfirmation', component: CheckboxConfirmation });

      // # extend content type
      forms.extendContentType({
        validator: () => ({
          mktlng: yup.object().shape({
            markets: yup.bool(),
          }),
        }),
        form: {
          advanced(...args) {
            console.log('extendContentType');
            return [{
              type: 'checkboxConfirmation',
              name: 'pluginOptions.mktlng.markets',
              intlLabel: { id: getTrad('plugin.schema.mktlng.markets.label-content-type'), defaultMessage: 'Enable markets for this Content-Type' },
              description: { id: getTrad('plugin.schema.mktlng.markets.description-content-type'), defaultMessage: 'Allow you to have content in different markets' },
            }];
          },
        },
      });

      // # extend fields
      forms.extendFields(LOCALIZED_FIELDS, {
        validator: args => ({
          mktlng: yup.object().shape({
            locales: yup.bool().test({
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
            if (!['contentType', 'component'].includes(forTarget)) {
              return [];
            }
            // const hasMktlngEnabled = get(contentTypeSchema, ['schema', 'pluginOptions', 'mktlng', 'locales'], false);
            const hasMktlngEnabled = LOCALIZED_FIELDS.includes(type);
            if (!hasMktlngEnabled) {
              return [];
            }
            if (type === 'component' && step === '1') {
              return [];
            }
            return [{
              type: 'checkbox',
              name: 'pluginOptions.mktlng.locales',
              intlLabel: { id: getTrad('plugin.schema.mktlng.locales.label-field'), defaultMessage: 'Enable locales for this field' },
              description: { id: getTrad('plugin.schema.mktlng.locales.description-field'), defaultMessage: 'The field can have different values in each locale' },
            }];
          },
        },
      });
    }

    return;

    // # content manager
    // inject component in editView with injectionZoneApi
    app.injectContentManagerComponent('editView', 'informations', { name: 'mktlng-locale-filter-edit-view', Component: EditViewInformations });
    // inject component in listView with injectionZoneApi
    app.injectContentManagerComponent('listView', 'actions', { name: 'mktlng-locale-filter', Component: LocalePicker });
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
