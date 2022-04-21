import get from 'lodash/get';
import { parse, stringify } from 'qs';
import getDefaultLocale from '../../utils/getDefaultLocale';

const addLocaleToLinksSearch = (links, kind, contentTypeSchemas, locales, permissions) => {
  return links.map(link => {
    const contentTypeUID = link.to.split(`/${kind}/`)[1];

    const contentTypeSchema = contentTypeSchemas.find(({ uid }) => uid === contentTypeUID);

    const hasMktlngEnabled = get(contentTypeSchema, 'pluginOptions.mktlng.locales', false);

    if (!hasMktlngEnabled) {
      return link;
    }

    const contentTypePermissions = permissions[contentTypeUID];
    const requiredPermissionsToViewALink =
      kind === 'collectionType'
        ? ['plugin::content-manager.explorer.read', 'plugin::content-manager.explorer.create']
        : ['plugin::content-manager.explorer.read'];

    const contentTypeNeededPermissions = Object.keys(contentTypePermissions).reduce((p, current) => {
      if (requiredPermissionsToViewALink.includes(current)) {
        p[current] = contentTypePermissions[current];
        return p;
      }
      p[current] = [];
      return p;
    }, {});

    const defaultLocale = getDefaultLocale(contentTypeNeededPermissions, locales);

    if (!defaultLocale) {
      return { ...link, isDisplayed: false };
    }

    const linkParams = link.search ? parse(link.search) : {};

    const params = linkParams
      ? { ...linkParams, plugins: { ...linkParams.plugins, mktlng: { locale: defaultLocale } } }
      : { plugins: { mktlng: { locale: defaultLocale } } };

    const search = stringify(params, { encode: false });

    return { ...link, search };
  });
};

export default addLocaleToLinksSearch;
