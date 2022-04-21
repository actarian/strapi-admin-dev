import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Flex } from '@strapi/design-system/Flex';
import {
  ModalBody,
  ModalFooter, ModalHeader, ModalLayout
} from '@strapi/design-system/ModalLayout';
import { Tab, TabGroup, TabPanel, TabPanels, Tabs } from '@strapi/design-system/Tabs';
import { Typography } from '@strapi/design-system/Typography';
import { Form, useRBACProvider } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useEditLocale from '../../../hooks/useEditLocale/useEditLocale';
import { localeValidationSchema } from '../../../schemas';
import { getTrad } from '../../../utils';
import AdvancedForm from './AdvancedForm';
import BaseForm from './BaseForm';

const LanguageModalUpdate = ({ item, onClose }) => {
  const { refetchPermissions } = useRBACProvider();
  const { isEditing, editLocale } = useEditLocale();
  const { formatMessage } = useIntl();

  const handleSubmit = async ({ displayName, isDefault }) => {
    await editLocale(item.id, { name: displayName, isDefault });
    await refetchPermissions();
  };

  return (
    <ModalLayout onClose={ onClose } labelledBy="edit-locale-title">
      <Formik
        initialValues={ {
          code: item?.code,
          displayName: item?.name || '',
          isDefault: Boolean(item?.isDefault),
        } }
        onSubmit={ handleSubmit }
        validationSchema={ localeValidationSchema }
      >
        <Form>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="edit-locale-title">
              { formatMessage({
                id: getTrad('settings.list.actions.edit'),
                defaultMessage: 'Edit a locale',
              }) }
            </Typography>
          </ModalHeader>
          <ModalBody>
            <TabGroup
              label={ formatMessage({
                id: getTrad('settings.locales.modal.title'),
                defaultMessage: 'Configurations',
              }) }
              id="tabs"
              variant="simple"
            >
              <Flex justifyContent="space-between">
                <Typography as="h2">
                  { formatMessage({
                    id: getTrad('settings.locales.modal.title'),
                    defaultMessage: 'Configurations',
                  }) }
                </Typography>
                <Tabs>
                  <Tab>
                    { formatMessage({
                      id: getTrad('settings.locales.modal.base'),
                      defaultMessage: 'Base settings',
                    }) }
                  </Tab>
                  <Tab>
                    { formatMessage({
                      id: getTrad('settings.locales.modal.advanced'),
                      defaultMessage: 'Advanced settings',
                    }) }
                  </Tab>
                </Tabs>
              </Flex>

              <Divider />

              <Box paddingTop={ 7 } paddingBottom={ 7 }>
                <TabPanels>
                  <TabPanel>
                    <BaseForm item={ item } />
                  </TabPanel>
                  <TabPanel>
                    <AdvancedForm isDefaultLocale={ Boolean(item && item.isDefault) } />
                  </TabPanel>
                </TabPanels>
              </Box>
            </TabGroup>
          </ModalBody>

          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={ onClose }>
                { formatMessage({ id: 'app.components.Button.cancel' }) }
              </Button>
            }
            endActions={
              <Button type="submit" startIcon={ <Check /> } disabled={ isEditing }>
                { formatMessage({ id: 'global.save' }) }
              </Button>
            }
          />
        </Form>
      </Formik>
    </ModalLayout>
  );
};

LanguageModalUpdate.defaultProps = {
  item: undefined,
};

LanguageModalUpdate.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default LanguageModalUpdate;
