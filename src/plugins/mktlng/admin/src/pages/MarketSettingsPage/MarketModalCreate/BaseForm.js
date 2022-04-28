import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import CountrySelect from '../CountrySelect/CountrySelect';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

const BaseForm = () => {
  const { formatMessage } = useIntl();
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  console.log('MarketModalCreate.BaseForm', values);

  /**
   * This is needed because the MarketCombobox component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onMarketChange = useCallback((market) => {
    setFieldValue('name', market.name);
    setFieldValue('code', market.code);
  }, [setFieldValue]);

  /**
   * This is needed because the MarketCombobox component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onMarketClear = useCallback(() => {
    setFieldValue('name', '');
    setFieldValue('code', '');
  }, [setFieldValue]);

  const onCountriesChange = useCallback((value) => {
    setFieldValue('countries', value);
  }, [setFieldValue]);

  const onCountriesClear = useCallback((value) => {
    setFieldValue('countries', []);
  }, [setFieldValue]);

  const onLanguagesChange = useCallback((value) => {
    setFieldValue('languages', value);
  }, [setFieldValue]);

  const onLanguagesClear = useCallback((value) => {
    setFieldValue('languages', []);
  }, [setFieldValue]);

  return (
    <Grid gap={ 4 }>
      <GridItem col={ 6 }>
        <TextInput
          name="code"
          label={ formatMessage({ id: getTrad('settings.markets.modal.markets.code'), defaultMessage: 'Market code' }) }
          error={ errors.code ? formatMessage({ id: getTrad('settings.markets.modal.markets.code.error'), defaultMessage: 'The market display name can only be less than 50 characters.' }) : undefined }
          value={ values.code }
          onChange={ handleChange }
        />
        { /* <MarketCombobox error={ errors.code } value={ values.code } onClear={ onMarketClear } onChange={ onMarketChange } /> */ }
      </GridItem>
      <GridItem col={ 6 }>
        <TextInput
          name="name"
          label={ formatMessage({ id: getTrad('settings.markets.modal.markets.name'), defaultMessage: 'Market display name' }) }
          hint={ formatMessage({ id: getTrad('settings.markets.modal.markets.name.description'), defaultMessage: 'Market will be displayed under that name in the administration panel' }) }
          error={ errors.name ? formatMessage({ id: getTrad('settings.markets.modal.markets.name.error'), defaultMessage: 'The market display name can only be less than 50 characters.' }) : undefined }
          value={ values.name }
          onChange={ handleChange }
        />
      </GridItem>
      <GridItem col={ 6 }>
        <CountrySelect error={ errors.countries } value={ values.countries } onClear={ onCountriesClear } onChange={ onCountriesChange } />
      </GridItem>
      <GridItem col={ 6 }>
        <LanguageSelect error={ errors.languages } value={ values.languages } onClear={ onLanguagesClear } onChange={ onLanguagesChange } />
      </GridItem>
    </Grid >
  );
};

export default BaseForm;
