import { Option, Select } from '@strapi/design-system/Select';
import { Typography } from '@strapi/design-system/Typography';
import React, { useState } from 'react';
import useMarkets from '../../../hooks/useMarkets/useMarkets';

export function MarketSelector(props) {
  const { name, value, attribute, onChange } = props;
  const { markets } = useMarkets();
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();

  // All our custom field config are here
  const { placeholder, label, hint } = attribute.customField || {};

  const serialize = (value) => {
    return JSON.stringify(value);
  };

  const deserialize = (value) => {
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return {};
      }
    }
  };

  const values = deserialize(value) || [];

  const onValues = (values) => {
    const change = {
      target: {
        name,
        value: serialize(values),
      },
    };
    onChange(change);
  }

  // console.log('MarketSelector', value, values, markets, props, attribute.customField);

  return (
    <>
      <Select id={ name } name={ name } label={ label || name } placeholder={ placeholder } hint={ hint }
        multi withTags clearLabel="Clear the field" customizeContent={ values => `${values.length} currently selected` }
        disabled={ disabled } error={ error } value={ values } onChange={ onValues } onClear={ () => onValues([]) }>
        { markets.map(market => (
          <Option key={ market.id } value={ market.code }>{ market.name }</Option>
        )) }
      </Select>
      { false && <>
        <button onClick={ () => toggleError(s => s ? undefined : 'An error occured') }>
          <Typography>Show the error state</Typography>
        </button>
        <button onClick={ () => toggleDisabled(s => !s) }>
          <Typography>Show the disabled state</Typography>
        </button>
      </> }
    </>
  );
}
