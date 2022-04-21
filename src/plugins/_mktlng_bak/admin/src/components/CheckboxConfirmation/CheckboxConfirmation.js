import { Button } from '@strapi/design-system/Button';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { getTrad } from '../../utils';

const TextAlignTypography = styled(Typography)`
  text-align: center;
`;

const CheckboxConfirmation = ({ name, value, intlLabel, description, isCreating, onChange }) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const label = intlLabel.id ? formatMessage({ id: intlLabel.id, defaultMessage: intlLabel.defaultMessage }, { ...intlLabel.values }) : name;

  const hint = description ? formatMessage({ id: description.id, defaultMessage: description.defaultMessage }, { ...description.values }) : '';

  const onValueChange = value => {
    if (isCreating || value) {
      return onChange({ target: { name, value, type: 'checkbox' } });
    }
    if (!value) {
      return setIsOpen(true);
    }
    return null;
  };

  const onConfirm = () => {
    onChange({ target: { name, value: false, type: 'checkbox' } });
    setIsOpen(false);
  };

  const onClose = () => setIsOpen(open => !open);

  return (
    <>
      <Checkbox type="checkbox" hint={ hint } id={ name } name={ name } value={ value } onValueChange={ onValueChange }>{ label }</Checkbox>
      { isOpen && (
        <Dialog title="Confirmation" isOpen={ isOpen } onClose={ onClose }>
          <DialogBody icon={ <ExclamationMarkCircle /> }>
            <Stack spacing={ 2 }>
              <Flex justifyContent="center">
                <TextAlignTypography id="confirm-description">
                  { formatMessage({ id: getTrad('CheckboxConfirmation.Modal.content'), defaultMessage: 'Disabling localization will engender the deletion of all your content but the one associated to your default locale (if existing).' }) }
                </TextAlignTypography>
              </Flex>
              <Flex justifyContent="center">
                <Typography fontWeight="semiBold" id="confirm-description">
                  { formatMessage({ id: getTrad('CheckboxConfirmation.Modal.body'), defaultMessage: 'Do you want to disable it?' }) }
                </Typography>
              </Flex>
            </Stack>
          </DialogBody>
          <DialogFooter startAction={
            <Button variant="tertiary" onClick={ onClose }>
              { formatMessage({ id: 'components.popUpWarning.button.cancel', defaultMessage: 'No, cancel' }) }
            </Button>
          } endAction={
            <Button variant="danger-light" onClick={ onConfirm }>
              { formatMessage({ id: getTrad('CheckboxConfirmation.Modal.button-confirm'), defaultMessage: 'Yes, disable' }) }
            </Button>
          } />
        </Dialog>
      ) }
    </>
  );
};

CheckboxConfirmation.defaultProps = {
  description: null,
  isCreating: false,
};

CheckboxConfirmation.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }),
  intlLabel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    values: PropTypes.object,
  }).isRequired,
  isCreating: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CheckboxConfirmation;
