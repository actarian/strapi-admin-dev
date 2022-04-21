/* eslint-disable react/jsx-indent */
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useDefaultMarkets from '../../../hooks/useDefaultMarkets/useDefaultMarkets';
import useMarkets from '../../../hooks/useMarkets/useMarkets';
import { getTrad } from '../../../utils';

/**
 * The component is memoized and needs a useCallback over the onMarketChange and
 * onClear props to prevent the Select from re-rendering N times when typing on a specific
 * key in a formik form
 */
const MarketSelect = React.memo(({ value, onClear, onMarketChange, error }) => {
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

  return (
    <Combobox
      aria-busy={ isLoading }
      error={ error }
      label={ formatMessage({ id: getTrad('settings.markets.modal.markets.label'), defaultMessage: 'Markets' }) }
      value={ computedValue }
      onClear={ value ? onClear : undefined }
      onChange={ selectedMarketKey => {
        const selectedMarket = options.find(market => market.value === selectedMarketKey);
        if (selectedMarket) {
          onMarketChange({ code: selectedMarket.value, displayName: selectedMarket.label });
        }
      } }
      placeholder={ formatMessage({ id: 'components.placeholder.select', defaultMessage: 'Select' }) }>
      { options.map(option => (
        <ComboboxOption value={ option.value } key={ option.value }>
          { option.label }
        </ComboboxOption>
      )) }
    </Combobox>
  );
});

MarketSelect.defaultProps = {
  error: undefined,
  value: undefined,
  onClear: () => { },
  onMarketChange: () => undefined,
};

MarketSelect.propTypes = {
  error: PropTypes.string,
  onClear: PropTypes.func,
  onMarketChange: PropTypes.func,
  value: PropTypes.string,
};

export default MarketSelect;
