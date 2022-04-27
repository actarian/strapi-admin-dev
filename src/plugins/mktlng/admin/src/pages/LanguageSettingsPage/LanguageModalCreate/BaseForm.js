import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import LocaleSelect from '../LanguageSelect/LanguageSelect';

const BaseForm = () => {
  const { formatMessage } = useIntl();
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  /**
   * This is needed because the LocaleSelect component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onLocaleChange = useCallback(
    nextLocale => {
      setFieldValue('displayName', nextLocale.displayName);
      setFieldValue('code', nextLocale.code);
    },
    [setFieldValue]
  );

  /**
   * This is needed because the LocaleSelect component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onClear = useCallback(() => {
    setFieldValue('displayName', '');
    setFieldValue('code', '');
  }, [setFieldValue]);

  return (
    <Grid gap={ 4 }>
      <GridItem col={ 6 }>
        <LocaleSelect
          error={ errors.code }
          value={ values.code }
          onLocaleChange={ onLocaleChange }
          onClear={ onClear }
        />
      </GridItem>

      <GridItem col={ 6 }>
        <TextInput
          name="displayName"
          label={ formatMessage({
            id: getTrad('settings.locales.modal.locales.displayName'),
            defaultMessage: 'Locale display name',
          }) }
          hint={ formatMessage({
            id: getTrad('settings.locales.modal.locales.displayName.description'),
            defaultMessage: 'Locale will be displayed under that name in the administration panel',
          }) }
          error={
            errors.displayName
              ? formatMessage({
                id: getTrad('settings.locales.modal.locales.displayName.error'),
                defaultMessage: 'The locale display name can only be less than 50 characters.',
              })
              : undefined
          }
          value={ values.displayName }
          onChange={ handleChange }
        />
      </GridItem>
    </Grid>
  );
};

export default BaseForm;
