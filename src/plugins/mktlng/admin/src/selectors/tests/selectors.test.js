import { fixtures } from '../../../../../../admin-test-utils';
import selectCollectionTypePermissions from '../selectCollectionTypesRelatedPermissions';
import selectI18NLocales from '../selectMktlngLocales';

describe('mktlng | selectors | selectCollectionTypePermissions', () => {
  let store;

  beforeEach(() => {
    store = { ...fixtures.store.state };
  });

  it('resolves the permissions key of the "rbacProvider.collectionTypesRelatedPermissions" store key', () => {
    const actual = selectCollectionTypePermissions(store);

    expect(actual).toBeDefined();
  });
});

describe('mktlng | selectors | selectI18NLocales', () => {
  let store;

  beforeEach(() => {
    store = { ...fixtures.store.state, mktlng_locales: { isLoading: true, locales: [] } };
  });

  it('resolves the permissions key of the "mktlng_locales" store key', () => {
    const actual = selectI18NLocales(store);

    expect(actual).toBeDefined();
  });
});
