import get from 'lodash/get';
import React from 'react';
import LocaleListCell from '../components/LocaleListCell/LocaleListCell';

const injectColumnInTable = ({ displayedHeaders, layout }) => {
  console.log('injectColumnInTable', displayedHeaders, layout);

  return {
    displayedHeaders: displayedHeaders.map(x => {
      const hasLocales = get(x, 'fieldSchema.pluginOptions.mktlng.locales', false);
      if (hasLocales) {
        const displayedHeader = { ...x };
        displayedHeader.cellFormatter = (props) => {
          const rawValue = props[x.name];
          try {
            const json = JSON.parse(rawValue);
            const keys = Object.keys(json);
            if (keys.length) {
              return json[keys[0]];
            }
          } catch (error) {
            return rawValue;
          }
        }
        return displayedHeader;
      }
      return x;
    }),
    layout,
  };

  const hasMarkets = get(layout, 'contentType.pluginOptions.mktlng.markets', false);
  if (!hasMarkets) {
    return { displayedHeaders, layout };
  }

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
