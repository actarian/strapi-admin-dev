import get from 'lodash/get';
import React from 'react';
import LocaleListCell from '../components/LocaleListCell/LocaleListCell';

const injectColumnInTable = ({ displayedHeaders, layout }) => {
  const isFieldLocalized = get(layout, 'contentType.pluginOptions.mktlng.locales', false);

  if (!isFieldLocalized) {
    return { displayedHeaders, layout };
  }

  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: '__locale_key__',
        fieldSchema: { type: 'string' },
        metadatas: { label: 'Content available in', searchable: false, sortable: false },
        name: 'locales',
        cellFormatter: props => <LocaleListCell { ...props } />,
      },
    ],
    layout,
  };
};

export default injectColumnInTable;
