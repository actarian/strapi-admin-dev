/* eslint-disable react/jsx-indent */
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useDefaultLocales from '../../../hooks/useDefaultLocales/useDefaultLocales';
import useLocales from '../../../hooks/useLocales/useLocales';
import { getTrad } from '../../../utils';

/**
 * The component is memoized and needs a useCallback over the onChange and
 * onClear props to prevent the Select from re-rendering N times when typing on a specific
 * key in a formik form
 */
const LanguageSelect = React.memo(({ value, onChange, onClear, error }) => {
  const { formatMessage } = useIntl();
  const { defaultLocales, isLoading } = useDefaultLocales();
  const { locales } = useLocales();

  const options = (defaultLocales || []).map(locale => ({
    label: locale.name,
    value: locale.code,
  })).filter(({ value: v }) => {
    const foundLocale = locales.find(({ code }) => code === v);
    return !foundLocale || foundLocale.code === value;
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
      label={ formatMessage({ id: getTrad('settings.locales.modal.locales.label'), defaultMessage: 'Locales' }) }
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

LanguageSelect.defaultProps = {
  error: undefined,
  value: undefined,
  onClear: () => { },
  onChange: () => undefined,
};

LanguageSelect.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
};

export default LanguageSelect;
