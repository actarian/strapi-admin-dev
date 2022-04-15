import { fixtures } from '../../../../../../admin-test-utils/lib';
import addLocaleToSingleTypesLinks from '../addLocaleToSingleTypesLinks';

describe('mktlng | contentManagerHooks | addLocaleToSingleTypesLinks', () => {
  let store;

  beforeEach(() => {
    store = {
      ...fixtures.store.state,
      mktlng_locales: { locales: [] },
    };
    store.rbacProvider.allPermissions = [];

    store.rbacProvider.collectionTypesRelatedPermissions = {
      test: {
        'plugin::content-manager.explorer.read': [],
        'plugin::content-manager.explorer.create': [],
      },
    };

    store.getState = function() {
      return this;
    };
  });

  it('should forward when the stLinks array is empty', () => {
    const data = {
      stLinks: [],
      models: [],
    };

    const results = addLocaleToSingleTypesLinks(data, store);

    expect(results).toEqual(data);
  });

  it('should not add the search key to a single type link when mktlng is not enabled on the single type', () => {
    const data = {
      stLinks: [{ to: 'cm/singleType/test' }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: false } } }],
    };

    const results = addLocaleToSingleTypesLinks(data, store);

    expect(results).toEqual(data);
  });

  it('should add a search key with the default locale when the user has the right to read it', () => {
    store.mktlng_locales.locales = [{ code: 'en', isDefault: true }];
    store.rbacProvider.collectionTypesRelatedPermissions.test[
      'plugin::content-manager.explorer.read'
    ] = [{ properties: { locales: ['en'] } }];

    const data = {
      stLinks: [{ to: 'cm/singleType/test' }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };

    const results = addLocaleToSingleTypesLinks(data, store);

    const expected = {
      stLinks: [{ to: 'cm/singleType/test', search: 'plugins[mktlng][locale]=en' }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };

    expect(results).toEqual(expected);
  });

  it('should set the isDisplayed key to false when the user does not have the right to read any locale', () => {
    store.mktlng_locales.locales = [{ code: 'en', isDefault: true }];
    store.rbacProvider.collectionTypesRelatedPermissions.test[
      'plugin::content-manager.explorer.read'
    ] = [{ properties: { locales: [] } }];

    const data = {
      stLinks: [{ to: 'cm/singleType/test' }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };
    const results = addLocaleToSingleTypesLinks(data, store);

    const expected = {
      stLinks: [{ to: 'cm/singleType/test', isDisplayed: false }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };

    expect(results).toEqual(expected);
  });

  it('should keep the previous search', () => {
    store.mktlng_locales.locales = [{ code: 'en', isDefault: true }];
    store.rbacProvider.collectionTypesRelatedPermissions.test[
      'plugin::content-manager.explorer.read'
    ] = [{ properties: { locales: ['en'] } }];

    const data = {
      stLinks: [{ to: 'cm/singleType/test', search: 'plugins[plugin][test]=test' }],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };
    const results = addLocaleToSingleTypesLinks(data, store);

    const expected = {
      stLinks: [
        {
          to: 'cm/singleType/test',
          search: 'plugins[plugin][test]=test&plugins[mktlng][locale]=en',
        },
      ],
      models: [{ uid: 'test', pluginOptions: { mktlng: { localized: true } } }],
    };

    expect(results).toEqual(expected);
  });
});
