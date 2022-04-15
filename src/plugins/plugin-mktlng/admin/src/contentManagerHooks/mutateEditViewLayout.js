import I18N from '@strapi/icons/Earth';
import StrikedWorld from '@strapi/icons/EarthStriked';
import get from 'lodash/get';
import React from 'react';
import LabelAction from '../components/LabelAction';
import { getTrad } from '../utils';

const enhanceRelationLayout = (layout, locale) =>
  layout.map(current => {
    const labelActionProps = {
      title: {
        id: getTrad('Field.localized'),
        defaultMessage: 'This value is unique for the selected locale',
      },
      icon: <I18N aria-hidden />,
    };
    let queryInfos = current.queryInfos;

    if (get(current, ['targetModelPluginOptions', 'mktlng', 'localized'], false)) {
      queryInfos = {
        ...queryInfos,
        defaultParams: { ...queryInfos.defaultParams, locale },
        paramsToKeep: ['plugins.mktlng.locale'],
      };
    }

    return { ...current, labelAction: <LabelAction {...labelActionProps} />, queryInfos };
  });

const enhanceEditLayout = layout =>
  layout.map(row => {
    const enhancedRow = row.reduce((acc, field) => {
      const type = get(field, ['fieldSchema', 'type'], null);
      const hasMktlngEnabled = get(
        field,
        ['fieldSchema', 'pluginOptions', 'mktlng', 'localized'],
        type === 'uid'
      );

      const labelActionProps = {
        title: {
          id: hasMktlngEnabled ? getTrad('Field.localized') : getTrad('Field.not-localized'),
          defaultMessage: hasMktlngEnabled
            ? 'This value is unique for the selected locale'
            : 'This value is common to all locales',
        },
        icon: hasMktlngEnabled ? <I18N aria-hidden /> : <StrikedWorld aria-hidden />,
      };

      acc.push({ ...field, labelAction: <LabelAction {...labelActionProps} /> });

      return acc;
    }, []);

    return enhancedRow;
  });

const enhanceComponentsLayout = (components, locale) => {
  return Object.keys(components).reduce((acc, current) => {
    const currentComponentLayout = components[current];

    const enhancedEditLayout = enhanceComponentLayoutForRelations(
      currentComponentLayout.layouts.edit,
      locale
    );

    acc[current] = {
      ...currentComponentLayout,
      layouts: { ...currentComponentLayout.layouts, edit: enhancedEditLayout },
    };

    return acc;
  }, {});
};

const enhanceComponentLayoutForRelations = (layout, locale) =>
  layout.map(row => {
    const enhancedRow = row.reduce((acc, field) => {
      if (
        get(field, ['fieldSchema', 'type']) === 'relation' &&
        get(field, ['targetModelPluginOptions', 'mktlng', 'localized'], false)
      ) {
        const queryInfos = {
          ...field.queryInfos,
          defaultParams: { ...field.queryInfos.defaultParams, locale },
          paramsToKeep: ['plugins.mktlng.locale'],
        };

        acc.push({ ...field, queryInfos });

        return acc;
      }

      acc.push({ ...field });

      return acc;
    }, []);

    return enhancedRow;
  });

const getPathToContentType = pathArray => ['contentType', ...pathArray];

const mutateEditViewLayoutHook = ({ layout, query }) => {
  const hasMktlngEnabled = get(
    layout,
    getPathToContentType(['pluginOptions', 'mktlng', 'localized']),
    false
  );

  if (!hasMktlngEnabled) {
    return { layout, query };
  }

  const currentLocale = get(query, ['plugins', 'mktlng', 'locale'], null);

  // This might break the cm, has the user might be redirected to the homepage
  if (!currentLocale) {
    return { layout, query };
  }

  const editLayoutPath = getPathToContentType(['layouts', 'edit']);
  const editRelationsPath = getPathToContentType(['layouts', 'editRelations']);
  const editLayout = get(layout, editLayoutPath);
  const editRelationsLayout = get(layout, editRelationsPath);
  const nextEditRelationLayout = enhanceRelationLayout(editRelationsLayout, currentLocale);
  const nextEditLayout = enhanceEditLayout(editLayout);

  const enhancedLayouts = {
    ...layout.contentType.layouts,
    editRelations: nextEditRelationLayout,
    edit: nextEditLayout,
  };

  const components = enhanceComponentsLayout(layout.components, currentLocale);

  const enhancedData = {
    query,
    layout: {
      ...layout,
      contentType: {
        ...layout.contentType,
        layouts: enhancedLayouts,
      },
      components,
    },
  };

  return enhancedData;
};

export default mutateEditViewLayoutHook;
export {
  enhanceComponentLayoutForRelations,
  enhanceComponentsLayout,
  enhanceEditLayout,
  enhanceRelationLayout,
};
