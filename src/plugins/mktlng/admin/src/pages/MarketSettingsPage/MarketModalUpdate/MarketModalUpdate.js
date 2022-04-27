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
import useEditMarket from '../../../hooks/useEditMarket/useEditMarket';
import { marketValidationSchema } from '../../../schemas';
import { getTrad } from '../../../utils';
import AdvancedForm from './AdvancedForm';
import BaseForm from './BaseForm';

const MarketModalUpdate = ({ item, onClose }) => {
  const { refetchPermissions } = useRBACProvider();
  const { isEditing, editMarket } = useEditMarket();
  const { formatMessage } = useIntl();

  const handleSubmit = async ({ name, isDefault }) => {
    await editMarket(item.id, { name, isDefault });
    await refetchPermissions();
  };

  const initialValues = Object.assign({
    code: '',
    name: '',
    countries: [],
    languages: [],
    isDefault: false
  }, item || {});

  return (
    <ModalLayout onClose={ onClose } labelledBy="edit-market-title">
      <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ marketValidationSchema } >
        <Form>
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="edit-market-title">
              { formatMessage({ id: getTrad('settings.list.actions.edit'), defaultMessage: 'Edit a market' }) }
            </Typography>
          </ModalHeader>
          <ModalBody>
            <TabGroup id="tabs" variant="simple" label={ formatMessage({ id: getTrad('settings.markets.modal.title'), defaultMessage: 'Configurations' }) }>
              <Flex justifyContent="space-between">
                <Typography as="h2">
                  { formatMessage({ id: getTrad('settings.markets.modal.title'), defaultMessage: 'Configurations' }) }
                </Typography>
                <Tabs>
                  <Tab>
                    { formatMessage({ id: getTrad('settings.markets.modal.base'), defaultMessage: 'Base settings' }) }
                  </Tab>
                  <Tab>
                    { formatMessage({ id: getTrad('settings.markets.modal.advanced'), defaultMessage: 'Advanced settings' }) }
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
                    <AdvancedForm isDefaultMarket={ Boolean(item && item.isDefault) } />
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

MarketModalUpdate.defaultProps = {
  item: undefined,
};

MarketModalUpdate.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    // countries: PropTypes.array.isRequired,
    // languages: PropTypes.array.isRequired,
    isDefault: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MarketModalUpdate;
