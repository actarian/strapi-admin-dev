import addLocaleToLinksSearch from './utils/addLocaleToLinksSearch';

const mutateSingleTypesLinks = ({ stLinks, models }, store) => {
  if (!stLinks.length) {
    return { stLinks, models };
  }

  const storeState = store.getState();
  const { locales } = storeState.mktlng_locales;
  const { collectionTypesRelatedPermissions } = storeState.rbacProvider;

  const mutatedLinks = addLocaleToLinksSearch(
    stLinks,
    'singleType',
    models,
    locales,
    collectionTypesRelatedPermissions
  );

  return { stLinks: mutatedLinks, models };
};

export default mutateSingleTypesLinks;
