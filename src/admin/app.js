import AuthLogo from './extensions/themes/ws/auth-logo.png';
import { colors as darkColors } from './extensions/themes/ws/dark/colors';
// import Favicon from './extensions/themes/ws/favicon.ico';
import Favicon from './extensions/themes/ws/favicon-32x32.png';
import { colors as lightColors } from './extensions/themes/ws/light/colors';
import MenuLogo from './extensions/themes/ws/menu-logo.png';

export default {
  config: {
    // custom favicon
    head: {
      favicon: Favicon,
    },
    // custom auth panel logo
    auth: {
      logo: AuthLogo,
    },
    // custom menu logo
    menu: {
      logo: MenuLogo,
    },
    // activate locales
    locales: [
      'en',
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    // extend the translations
    translations: {
      it: {
        "app.components.LeftMenu.navbrand.title": "Awesome dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Admin panel",
      },
      en: {
        "app.components.LeftMenu.navbrand.title": "Awesome dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Admin panel",
      },
    },
    // disable video tutorials
    tutorials: false,
    // disable notifications about new Strapi releases
    notifications: {
      releases: false
    },
    // custom color theme
    theme: {
      light: {
        colors: lightColors,
      },
      dark: {
        colors: darkColors,
      }
    },
  },
  bootstrap(app) {
    // console.log(app);
  },
};
