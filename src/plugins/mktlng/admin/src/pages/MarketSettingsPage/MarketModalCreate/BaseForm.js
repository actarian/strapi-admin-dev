import { Grid, GridItem } from '@strapi/design-system/Grid';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import MarketSelect from '../MarketSelect/MarketSelect';

const BaseForm = () => {
  const { formatMessage } = useIntl();
  const { values, handleChange, setFieldValue, errors } = useFormikContext();

  /**
   * This is needed because the MarketSelect component is a memoized component
   * since it renders ~500 locales and that formik would trigger a re-render on it without
   * it
   */
  const onMarketChange = useCallback(
    nextMarket => {
      setFieldValue('displayName', nextMarket.displayName);
      setFieldValue('code', nextMarket.code);
    },
    [setFieldValue]
  );

  /**
   * This is needed because the MarketSelect component is a memoized component
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
        <MarketSelect
          error={ errors.code }
          value={ values.code }
          onMarketChange={ onMarketChange }
          onClear={ onClear }
        />
      </GridItem>
      <GridItem col={ 6 }>
        <TextInput
          name="displayName"
          label={ formatMessage({ id: getTrad('settings.locales.modal.locales.displayName'), defaultMessage: 'Market display name' }) }
          hint={ formatMessage({ id: getTrad('settings.locales.modal.locales.displayName.description'), defaultMessage: 'Market will be displayed under that name in the administration panel' }) }
          error={
            errors.displayName
              ? formatMessage({ id: getTrad('settings.locales.modal.locales.displayName.error'), defaultMessage: 'The locale display name can only be less than 50 characters.' })
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
