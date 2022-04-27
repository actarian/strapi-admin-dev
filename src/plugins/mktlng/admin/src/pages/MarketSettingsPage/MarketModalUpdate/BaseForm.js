import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import CountrySelect from '../CountrySelect/CountrySelect';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

const BaseForm = ({ item }) => {
  const { formatMessage } = useIntl();
  const { values, handleChange, errors } = useFormikContext();

  const onCountriesChange = useCallback((value) => {
    handleChange();
  }, [handleChange]);

  const onCountriesClear = useCallback((value) => {
    handleChange();
  }, [handleChange]);

  const onLanguagesChange = useCallback((value) => {
    handleChange();
  }, [handleChange]);

  const onLanguagesClear = useCallback((value) => {
    handleChange();
  }, [handleChange]);

  return (
    <Grid gap={ 4 }>
      <GridItem col={ 6 }>
        { /*
        <Select
          label={ formatMessage({ id: getTrad('settings.markets.modal.markets.label'), defaultMessage: 'Markets' }) }
          value={ item.code }
          disabled
        >
          <Option value={ item.code }>{ item.name }</Option>
        </Select>
        */ }
        <TextInput
          name="code"
          label={ formatMessage({ id: getTrad('settings.markets.modal.markets.code'), defaultMessage: 'Market display name' }) }
          error={ errors.code ? formatMessage({ id: getTrad('settings.markets.modal.markets.code.error'), defaultMessage: 'The market code can only be less than 6 characters.' }) : undefined }
          value={ values.code }
          onChange={ handleChange }
        />
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
    </Grid>
  );
};

export default BaseForm;

BaseForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    // countries: PropTypes.array.isRequired,
    // languages: PropTypes.array.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }).isRequired,
};
