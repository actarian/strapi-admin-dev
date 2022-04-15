import { useCMEditViewDataManager, useQueryParams } from '@strapi/helper-plugin';
import get from 'lodash/get';
import has from 'lodash/has';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useContentTypePermissions from '../../hooks/useContentTypePermissions';
import selectI18NLocales from '../../selectors/selectMktlngLocales';
import CMEditViewLocalePicker from './CMEditViewLocalePicker';

const CMEditViewInjectedComponents = () => {
  const { layout, modifiedData, initialData, slug, isSingleType } = useCMEditViewDataManager();
  const { createPermissions, readPermissions } = useContentTypePermissions(slug);
  const locales = useSelector(selectI18NLocales);
  const params = useParams();
  const [{ query }, setQuery] = useQueryParams();

  const id = get(params, 'id', null);
  const currentEntityId = id;
  const defaultLocale = locales.find(loc => loc.isDefault);
  const currentLocale = get(query, 'plugins.mktlng.locale', defaultLocale.code);
  const hasMktlngEnabled = get(layout, ['pluginOptions', 'mktlng', 'localized'], false);
  const hasDraftAndPublishEnabled = get(layout, ['options', 'draftAndPublish'], false);

  const defaultQuery = useMemo(() => {
    if (!query) {
      return { plugins: { mktlng: { locale: currentLocale } } };
    }

    return query;
  }, [query, currentLocale]);

  if (!hasMktlngEnabled) {
    return null;
  }

  if (!currentLocale) {
    return null;
  }

  const localizations = get(modifiedData, 'localizations', []);
  let currentLocaleStatus = 'did-not-create-locale';

  if (has(initialData, 'publishedAt')) {
    currentLocaleStatus = initialData.publishedAt ? 'published' : 'draft';
  }

  return (
    <CMEditViewLocalePicker
      appLocales={locales}
      currentEntityId={currentEntityId}
      createPermissions={createPermissions}
      currentLocaleStatus={currentLocaleStatus}
      hasDraftAndPublishEnabled={hasDraftAndPublishEnabled}
      localizations={localizations}
      isSingleType={isSingleType}
      query={defaultQuery}
      readPermissions={readPermissions}
      setQuery={setQuery}
      slug={slug}
    />
  );
};

export default CMEditViewInjectedComponents;
