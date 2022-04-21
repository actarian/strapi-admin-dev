import { Checkbox } from '@strapi/design-system/Checkbox';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

const AdvancedForm = ({ isDefaultMarket }) => {
  const { values, setFieldValue } = useFormikContext();
  const { formatMessage } = useIntl();

  return (
    <Checkbox
      name="isDefault"
      hint={ formatMessage({ id: getTrad('settings.markets.modal.advanced.setAsDefault.hint'), defaultMessage: 'One default market is required, change it by selecting another one' }) }
      onChange={ () => setFieldValue('isDefault', !values.isDefault) }
      value={ values.isDefault }
      disabled={ isDefaultMarket }>
      { formatMessage({ id: getTrad('settings.markets.modal.advanced.setAsDefault'), defaultMessage: 'Set as default market' }) }
    </Checkbox>
  );
};

AdvancedForm.propTypes = {
  isDefaultMarket: PropTypes.bool.isRequired,
};

export default AdvancedForm;
