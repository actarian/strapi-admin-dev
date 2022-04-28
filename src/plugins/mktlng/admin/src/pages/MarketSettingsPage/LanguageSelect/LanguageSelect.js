/* eslint-disable react/jsx-indent */
import { Option, Select } from '@strapi/design-system/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useDefaultLocales from '../../../hooks/useDefaultLocales/useDefaultLocales';
import { getTrad } from '../../../utils';

/**
 * The component is memoized and needs a useCallback over the onChange and
 * onClear props to prevent the Select from re-rendering N times when typing on a specific
 * key in a formik form
 */
const LanguageSelect = React.memo(({ value, onChange, onClear, error }) => {
  const { formatMessage } = useIntl();
  const { defaultLocales, isLoading } = useDefaultLocales();

  const options = (defaultLocales || []).map(market => ({
    label: market.name,
    value: market.code,
  }));

  const onSelectChange = (value) => {
    onChange(value);
    () => onSelectChange([])
  };

  const onSelectClear = () => {
    if (value) {
      // onSelectChange([]);
      onClear();
    }
  };

  return (
    <Select
      aria-busy={ isLoading }
      id={ 'language' } name={ 'language' } label={ 'Select a language' } placeholder={ 'Select a language' } hint={ 'Select a language hint' }
      multi withTags clearLabel={ 'Clear the field' } customizeContent={ (values) => `${values ? values.length : 0} currently selected` }
      disabled={ false }
      error={ error ? formatMessage({ id: getTrad('settings.markets.modal.markets.languages.error'), defaultMessage: 'The market languages field is incomplete.' }) : undefined }
      value={ value || [] } onChange={ onSelectChange } onClear={ onSelectClear }>
      { options.map(option => (
        <Option key={ option.value } value={ option.value }>{ option.label }</Option>
      )) }
    </Select>
  );
});

LanguageSelect.defaultProps = {
  error: undefined,
  value: undefined,
  onClear: () => { },
  onChange: () => undefined,
};

LanguageSelect.propTypes = {
  error: PropTypes.string,
  value: PropTypes.array,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
};

export default LanguageSelect;
