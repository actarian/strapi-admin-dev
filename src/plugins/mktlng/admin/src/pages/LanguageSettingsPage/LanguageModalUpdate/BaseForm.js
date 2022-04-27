import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Option, Select } from '@strapi/design-system/Select';
import { TextInput } from '@strapi/design-system/TextInput';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

const BaseForm = ({ item }) => {
  const { formatMessage } = useIntl();
  const { values, handleChange, errors } = useFormikContext();

  return (
    <Grid gap={ 4 }>
      <GridItem col={ 6 }>
        <Select label={ formatMessage({ id: getTrad('settings.locales.modal.locales.label'), defaultMessage: 'Locales' }) } value={ item.code } disabled>
          <Option value={ item.code }>{ item.name }</Option>
        </Select>
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

BaseForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }).isRequired,
};
