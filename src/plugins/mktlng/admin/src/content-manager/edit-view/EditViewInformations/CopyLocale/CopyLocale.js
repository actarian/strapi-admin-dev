import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import { Flex } from '@strapi/design-system/Flex';
import { Option, Select } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { useCMEditViewDataManager, useNotification } from '@strapi/helper-plugin';
import Duplicate from '@strapi/icons/Duplicate';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { axiosInstance, getTrad } from '../../../../utils';
import { cleanData, generateOptions } from './utils';

const StyledTypography = styled(Typography)`
  svg {
    margin-right: ${({ theme }) => theme.spaces[2]};
    fill: none;
    > g,
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;

const CenteredTypography = styled(Typography)`
  text-align: center;
`;

const Content = ({ appLocales, currentLocale, localizations, readPermissions }) => {
  const options = generateOptions(appLocales, currentLocale, localizations, readPermissions);

  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { allLayoutData, initialData, slug } = useCMEditViewDataManager();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0]?.value || '');

  const handleConfirmCopyLocale = async () => {
    if (!value) {
      handleToggle();

      return;
    }

    const requestURL = `/content-manager/collection-types/${slug}/${value}`;

    setIsLoading(true);
    try {
      const { data: response } = await axiosInstance.get(requestURL);

      const cleanedData = cleanData(response, allLayoutData, localizations);
      ['createdBy', 'updatedBy', 'publishedAt', 'id', 'createdAt'].forEach(key => {
        if (!initialData[key]) return;
        cleanedData[key] = initialData[key];
      });

      dispatch({ type: 'ContentManager/CrudReducer/GET_DATA_SUCCEEDED', data: cleanedData });

      toggleNotification({
        type: 'success',
        message: {
          id: getTrad('CopyLocale.copy-success'),
          defaultMessage: 'Locale copied!',
        },
      });
    } catch (err) {
      console.error(err);

      toggleNotification({
        type: 'warning',
        message: {
          id: getTrad('CopyLocale.copy-failure'),
          defaultMessage: 'Failed to copy locale',
        },
      });
    } finally {
      setIsLoading(false);
      handleToggle();
    }
  };

  const handleChange = value => {
    setValue(value);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <StyledTypography
        fontSize={ 2 }
        textColor="primary600"
        as="button"
        type="button"
        onClick={ handleToggle }
      >
        <Flex>
          <Duplicate width="12px" height="12px" />
          { formatMessage({
            id: getTrad('CopyLocale.copy-text'),
            defaultMessage: 'Fill in from another locale',
          }) }
        </Flex>
      </StyledTypography>
      { isOpen && (
        <Dialog onClose={ handleToggle } title="Confirmation" isOpen={ isOpen }>
          <DialogBody icon={ <ExclamationMarkCircle /> }>
            <Stack spacing={ 2 }>
              <Flex justifyContent="center">
                <CenteredTypography id="confirm-description">
                  { formatMessage({
                    id: getTrad('CopyLocale.ModalConfirm.content'),
                    defaultMessage:
                      'Your current content will be erased and filled by the content of the selected locale:',
                  }) }
                </CenteredTypography>
              </Flex>
              <Box>
                <Select
                  label={ formatMessage({
                    id: getTrad('settings.locales.modal.locales.label'),
                  }) }
                  onChange={ handleChange }
                  value={ value }
                >
                  { options.map(({ label, value }) => {
                    return (
                      <Option key={ value } value={ value }>
                        { label }
                      </Option>
                    );
                  }) }
                </Select>
              </Box>
            </Stack>
          </DialogBody>
          <DialogFooter
            startAction={
              <Button onClick={ handleToggle } variant="tertiary">
                { formatMessage({
                  id: 'popUpWarning.button.cancel',
                  defaultMessage: 'No, cancel',
                }) }
              </Button>
            }
            endAction={
              <Button variant="success" onClick={ handleConfirmCopyLocale } loading={ isLoading }>
                { formatMessage({
                  id: getTrad('CopyLocale.submit-text'),
                  defaultMessage: 'Yes, fill in',
                }) }
              </Button>
            }
          />
        </Dialog>
      ) }
    </>
  );
};

export function CopyLocale(props) {
  if (!props.localizations.length) {
    return null;
  }
  return <Content { ...props } />;
};

CopyLocale.propTypes = {
  localizations: PropTypes.array.isRequired,
};

Content.propTypes = {
  appLocales: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  currentLocale: PropTypes.string.isRequired,
  localizations: PropTypes.array.isRequired,
  readPermissions: PropTypes.array.isRequired,
};
