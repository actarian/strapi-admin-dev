import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import LanguageCombobox from '../LanguageCombobox/LanguageCombobox';

const BaseForm = () => {
  const { formatMessage } = useIntl();
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  /**
   * This is needed because the LanguageCombobox component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onLanguageClear = useCallback(() => {
    setFieldValue('name', '');
    setFieldValue('code', '');
  }, [setFieldValue]);

  /**
   * This is needed because the LanguageCombobox component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onLanguageChange = useCallback(
    nextLocale => {
      setFieldValue('name', nextLocale.name);
      setFieldValue('code', nextLocale.code);
    },
    [setFieldValue]
  );

  return (
    <Grid gap={ 4 }>
      <GridItem col={ 6 }>
        <LanguageCombobox error={ errors.code } value={ values.code } onClear={ onLanguageClear } onChange={ onLanguageChange } />
      </GridItem>
      <GridItem col={ 6 }>
        <TextInput
          name="name"
          label={ formatMessage({ id: getTrad('settings.locales.modal.locales.name'), defaultMessage: 'Locale display name' }) }
          hint={ formatMessage({ id: getTrad('settings.locales.modal.locales.name.description'), defaultMessage: 'Locale will be displayed under that name in the administration panel' }) }
          error={ errors.name ? formatMessage({ id: getTrad('settings.locales.modal.locales.name.error'), defaultMessage: 'The locale display name can only be less than 50 characters.' }) : undefined }
          value={ values.name }
          onChange={ handleChange }
        />
      </GridItem>
    </Grid>
  );
};

export default BaseForm;
