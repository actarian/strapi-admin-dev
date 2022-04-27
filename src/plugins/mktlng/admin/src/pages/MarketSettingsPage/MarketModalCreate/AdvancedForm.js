import { Checkbox } from '@strapi/design-system/Checkbox';
import { useFormikContext } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

const AdvancedForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const { formatMessage } = useIntl();
  const onChange = () => setFieldValue('isDefault', !values.isDefault);
  return (
    <Checkbox
      hint={ formatMessage({ id: getTrad('settings.markets.modal.advanced.setAsDefault.hint'), defaultMessage: 'One default market is required, change it by selecting another one' }) }
      onChange={ onChange }
      value={ values.isDefault }
    >{ formatMessage({ id: getTrad('settings.markets.modal.advanced.setAsDefault'), defaultMessage: 'Set as default market' }) }</Checkbox>
  );
};

export default AdvancedForm;
