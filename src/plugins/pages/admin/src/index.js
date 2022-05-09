import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import Initializer from './components/Initializer/Initializer';
import PluginIcon from './components/PluginIcon/PluginIcon';
import EditViewInformations from './content-manager/edit-view/EditViewInformations/EditViewInformations';
import permissions from './permissions';
import pluginId from './pluginId';
import { getTrad } from './utils';

const name = pluginPkg.strapi.name;

export default {
  register(app) {

    app.createSettingSection(
      { id: 'pages', intlLabel: { id: 'pages.plugin.name', defaultMessage: 'Pages' } }, // Section to create
      [
        {
          intlLabel: { id: getTrad('settings.pages.title'), defaultMessage: 'Pages' },
          id: 'pages',
          to: '/settings/pages',
          Component: async () => {
            const component = await import(/* webpackChunkName: "pages-pages-settings" */ './pages/PagesSettings/PagesSettings');
            // console.log(component);
            return component;
          },
          permissions: permissions.accessMain,
        },
      ]
    );

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Pages',
      },
      Component: async () => {
        const component = await import('./pages/Router/Router');
        return component;
      },
    });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {

    app.injectContentManagerComponent('editView', 'right-links', { name: 'EditViewInformations', Component: EditViewInformations });

  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(locales.map((locale) => {
      return import(`./translations/${locale}.json`).then(({ default: data }) => {
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
    }));
    return Promise.resolve(importedTrads);
  },

};
