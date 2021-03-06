import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import CustomFieldRenderer from './components/CustomFieldRenderer/CustomFieldRenderer';
import pluginId from './pluginId';

const name = pluginPkg.strapi.name;

export default {
  register(app) {

    app.addFields([
      { type: 'customFieldRenderer', Component: CustomFieldRenderer },
    ]);

    /*
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    */
    /*
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
    });
    */
  },

  bootstrap(app) {
  },
  async registerTrads({ locales }) {
    const translations = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`).then(({ default: data }) => (
          {
            data: prefixPluginTranslations(data, pluginId),
            locale,
          }
        )).catch(() => (
          {
            data: {},
            locale,
          }
        ));
      })
    );

    return Promise.resolve(translations);
  },
};
