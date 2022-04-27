/* eslint-disable react/jsx-indent */
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useDefaultMarkets from '../../../hooks/useDefaultMarkets/useDefaultMarkets';
import useMarkets from '../../../hooks/useMarkets/useMarkets';
import { getTrad } from '../../../utils';

/**
 * The component is memoized and needs a useCallback over the onChange and
 * onClear props to prevent the Select from re-rendering N times when typing on a specific
 * key in a formik form
 */
const MarketCombobox = React.memo(({ value, onChange, onClear, error }) => {
  const { formatMessage } = useIntl();
  const { defaultMarkets, isLoading } = useDefaultMarkets();
  const { markets } = useMarkets();

  const options = (defaultMarkets || []).map(market => ({
    label: market.name,
    value: market.code,
  })).filter(({ value: v }) => {
    const foundMarket = markets.find(({ code }) => code === v);
    return !foundMarket || foundMarket.code === value;
  });

  const computedValue = value || '';

  const onComboboxChange = (selectedKey) => {
    const selected = options.find(locale => locale.value === selectedKey);
    if (selected) {
      onChange({ code: selected.value, name: selected.label });
    }
  };

  const onComboboxClear = () => {
    if (value) {
      onClear();
    }
  };

  return (
    <Combobox
      aria-busy={ isLoading }
      error={ error }
      label={ formatMessage({ id: getTrad('settings.markets.modal.markets.label'), defaultMessage: 'Markets' }) }
      placeholder={ formatMessage({ id: 'components.placeholder.select', defaultMessage: 'Select' }) }
      value={ computedValue }
      onChange={ onComboboxChange }
      onClear={ onComboboxClear }
    >
      { options.map(option => (
        <ComboboxOption value={ option.value } key={ option.value }>
          { option.label }
        </ComboboxOption>
      )) }
    </Combobox>
  );
});

MarketCombobox.defaultProps = {
  error: undefined,
  value: undefined,
  onClear: () => { },
  onChange: () => undefined,
};

MarketCombobox.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
};

export default MarketCombobox;
