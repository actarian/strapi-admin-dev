import pluginPkg from "../../package.json";
import Wysiwyg from "./components/Wysiwyg";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;

const myComponent = async () => {
  const component = await import(
    /* webpackChunkName: "strapi-tiptip-editor-settings-page" */ './pages/App'
  );

  return component;
};

export default {
  register(app) {

    app.createSettingSection(
      { id: 'wysiwyg', intlLabel: { id: 'wysiwyg.plugin.name', defaultMessage: 'Wysiwyg' } }, // Section to create
      [
        // links
        {
          intlLabel: { id: 'wysiwyg.plugin.name', defaultMessage: 'Settings' },
          id: 'Settings',
          to: '/settings/wysiwyg',
          Component: myComponent,
          permissions: [],
        },
      ]
    );

    app.addFields({ type: 'wysiwyg', Component: Wysiwyg });

    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });

  },
  bootstrap() { },
};
