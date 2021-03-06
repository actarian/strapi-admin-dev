import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Flex } from '@strapi/design-system/Flex';
import { ModalBody, ModalFooter, ModalHeader, ModalLayout } from '@strapi/design-system/ModalLayout';
import { Tab, TabGroup, TabPanel, TabPanels, Tabs } from '@strapi/design-system/Tabs';
import { Typography } from '@strapi/design-system/Typography';
import { Form, useRBACProvider } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import useAddLocale from '../../../hooks/useAddLocale/useAddLocale';
import { localeValidationSchema } from '../../../schemas';
import { getTrad } from '../../../utils';
import AdvancedForm from './AdvancedForm';
import BaseForm from './BaseForm';

const initialValues = {
  code: '',
  name: '',
  isDefault: false,
};

const LanguageModalCreate = ({ onClose }) => {
  const { formatMessage } = useIntl();
  const { isAdding, addLocale } = useAddLocale();
  const { refetchPermissions } = useRBACProvider();

  /**
   * No need to explicitly call the onClose prop here
   * since the all tree (from the root of the page) is destroyed and re-mounted
   * because of the RBAC refreshing and the potential move of the default locale
   */
  const onSubmit = async values => {
    await addLocale({
      code: values.code,
      name: values.name,
      isDefault: values.isDefault,
    });
    await refetchPermissions();
  };

  return (
    <ModalLayout onClose={ onClose } labelledBy="add-locale-title">
      <Formik initialValues={ initialValues } onSubmit={ onSubmit } validationSchema={ localeValidationSchema } validateOnChange={ false } >
        <Form>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="add-locale-title">
              { formatMessage({ id: getTrad('settings.list.actions.add'), defaultMessage: 'Add new locale' }) }
            </Typography>
          </ModalHeader>
          <ModalBody>
            <TabGroup id="tabs" variant="simple" label={ formatMessage({ id: getTrad('settings.locales.modal.title'), defaultMessage: 'Configurations' }) } >
              <Flex justifyContent="space-between">
                <Typography as="h2" variant="beta">
                  { formatMessage({ id: getTrad('settings.locales.modal.title'), defaultMessage: 'Configurations' }) }
                </Typography>
                <Tabs>
                  <Tab>
                    { formatMessage({ id: getTrad('settings.locales.modal.base'), defaultMessage: 'Base settings' }) }
                  </Tab>
                  <Tab>
                    { formatMessage({ id: getTrad('settings.locales.modal.advanced'), defaultMessage: 'Advanced settings' }) }
                  </Tab>
                </Tabs>
              </Flex>
              <Divider />
              <Box paddingTop={ 7 } paddingBottom={ 7 }>
                <TabPanels>
                  <TabPanel>
                    <BaseForm />
                  </TabPanel>
                  <TabPanel>
                    <AdvancedForm />
                  </TabPanel>
                </TabPanels>
              </Box>
            </TabGroup>
          </ModalBody>
          <ModalFooter startActions={
            <Button variant="tertiary" onClick={ onClose }>
              { formatMessage({ id: 'app.components.Button.cancel', defaultMessage: 'Cancel' }) }
            </Button> } endActions={
              <Button type="submit" startIcon={ <Check /> } disabled={ isAdding }>
                { formatMessage({ id: 'global.save', defaultMessage: 'Save' }) }
              </Button> } />
        </Form>
      </Formik>
    </ModalLayout>
  );
};

LanguageModalCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LanguageModalCreate;
