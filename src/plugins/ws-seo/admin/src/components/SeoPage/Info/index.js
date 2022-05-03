import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Flex } from '@strapi/design-system/Flex';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Tab, TabGroup, TabPanel, TabPanels, Tabs } from '@strapi/design-system/Tabs';
import { Typography } from '@strapi/design-system/Typography';
import { useAutoReloadOverlayBlocker, useNotification } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import Plus from '@strapi/icons/Plus';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import { updateContentType } from '../../../utils/api';
import { Illo } from '../Info/EmptyComponentLayout/illo';

const metaSchema = {
  type: 'component',
  repeatable: false,
  component: 'page.meta'
};

const Info = ({ contentTypes }) => {
  const { formatMessage } = useIntl();
  const { lockAppWithAutoreload, unlockAppWithAutoreload } = useAutoReloadOverlayBlocker();
  const toggleNotification = useNotification();

  const collectionTypes = (contentTypes && contentTypes.collectionTypes) ? contentTypes.collectionTypes : [];
  const singleTypes = (contentTypes && contentTypes.singleTypes) ? contentTypes.singleTypes : [];

  async function setContentType(item, activate) {
    console.log('setContentType', item, activate);
    const contentType = item.contentType;
    const schema = contentType.__schema__;
    console.log(schema);

    const attributes = schema.attributes;
    const hasMetaAttribute = attributes && attributes.meta; // && attributes.meta.component === 'page.meta';

    const update = async (schema) => {
      lockAppWithAutoreload();
      try {
        await updateContentType(contentType.uid, schema);
      } catch (error) {
        console.error(error);
        toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
      }
      unlockAppWithAutoreload();
    };

    if (hasMetaAttribute && !activate) {
      delete attributes.meta;
      await update(schema);
    }

    if (!hasMetaAttribute && activate) {
      attributes.meta = metaSchema;
      await update(schema);
    }

    /*
    {
      "components": [],
      "contentType": {
        "displayName": "Document",
        "singularName": "document",
        "pluralName": "documents",
        "description": "",
        "draftAndPublish": true,
        "pluginOptions": {
          "mktlng": {
            "locales": false,
            "markets": true
          }
        },
        "kind": "collectionType",
        "collectionName": "documents",
        "attributes": {
          "title": {
            "type": "json",
            "pluginOptions": {
              "mktlng": {
                "locales": true
              }
            },
            "customField": {
              "type": "localizedText",
              "forType": "string"
            }
          },
          "abstract": {
            "type": "json",
            "pluginOptions": {
              "mktlng": {
                "locales": true
              }
            },
            "customField": {
              "type": "localizedText",
              "forType": "text"
            }
          },
          "meta": {
            "type": "component",
            "repeatable": false,
            "component": "meta.meta"
          },
          "body": {
            "type": "richtext"
          },
          "test": {
            "type": "string"
          },
          "test2": {
            "type": "string"
          },
          "markets": {
            "type": "json",
            "configurable": true,
            "customField": {
              "type": "marketSelector",
              "forType": "text"
            }
          }
        }
      }
    }
    */
  }

  return (
    <>
      <Box padding={ 8 }>
        <TabGroup label="label" id="tabs">
          <Tabs>
            <Tab>
              <Typography variant="omega"> Collection Types</Typography>
            </Tab>
            <Tab>
              <Typography variant="omega"> Single Types</Typography>
            </Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              {/* TABLE */ }
              <Table colCount={ 2 } rowCount={ collectionTypes.length }>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { collectionTypes.length ? (collectionTypes.map((item) => (
                    <Tr key={ item.uid }>
                      <Td>
                        <Typography textColor="neutral800">
                          { item.globalId }
                        </Typography>
                      </Td>
                      <Td>
                        <Flex justifyContent="right" alignItems="right">
                          { item.meta ? (
                            true ?
                              <Button onClick={ () => setContentType(item, false) } title="Deactivate Content Type">Deactivate</Button>
                              : <LinkButton disabled startIcon={ <Check /> }>
                                { formatMessage({ id: getTrad('page.info.added'), defaultMessage: 'Added' }) }
                              </LinkButton>
                          ) : (
                            true ?
                              <Button onClick={ () => setContentType(item, true) } title="Activate Content Type">Activate</Button>
                              :
                              <LinkButton to={ `/plugins/content-type-builder/content-types/${item.uid}` } variant="secondary" startIcon={ <Plus /> }>
                                { formatMessage({ id: getTrad('page.info.add'), defaultMessage: 'Add component' }) }
                              </LinkButton>
                          ) }
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                  ) : (
                    <Box padding={ 8 } background="neutral0">
                      <EmptyStateLayout
                        icon={ <Illo /> }
                        content={ formatMessage({ id: getTrad('page.info.noCollectionTypes'), defaultMessage: "You don't have any collection-types yet..." }) }
                        action={
                          <LinkButton to="/plugins/content-type-builder" variant="secondary" startIcon={ <Plus /> }>
                            { formatMessage({ id: getTrad('page.info.create-collection-type'), defaultMessage: 'Create your first collection-type' }) }
                          </LinkButton>
                        }
                      />
                    </Box>
                  ) }
                </Tbody>
              </Table>
              {/* END TABLE */ }
            </TabPanel>
            <TabPanel>
              {/* TABLE */ }
              <Table colCount={ 2 } rowCount={ singleTypes.length }>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { singleTypes.length ? (singleTypes.map((item) => (
                    <Tr key={ item.uid }>
                      <Td>
                        <Typography textColor="neutral800">
                          { item.globalId }
                        </Typography>
                      </Td>
                      <Td>
                        <Flex justifyContent="right" alignItems="right">
                          { item.meta ? (
                            <LinkButton disabled startIcon={ <Check /> }>
                              { formatMessage({ id: getTrad('page.info.added'), defaultMessage: 'Added', }) }
                            </LinkButton>
                          ) : (
                            <LinkButton to={ `/plugins/content-type-builder/content-types/${item.uid}` } variant="secondary" startIcon={ <Plus /> }>
                              { formatMessage({ id: getTrad('page.info.add'), defaultMessage: 'Add component', }) }
                            </LinkButton>
                          ) }
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                  ) : (
                    <Box padding={ 8 } background="neutral0">
                      <EmptyStateLayout
                        icon={ <Illo /> }
                        content={ formatMessage({ id: getTrad('page.info.no-single-types'), defaultMessage: "You don't have any single-types yet..." }) }
                        action={
                          <LinkButton to="/plugins/content-type-builder" variant="secondary" startIcon={ <Plus /> }>
                            { formatMessage({ id: getTrad('page.info.create-single-type'), defaultMessage: 'Create your first single-type' }) }
                          </LinkButton>
                        }
                      />
                    </Box>
                  ) }
                </Tbody>
              </Table>
              {/* END TABLE */ }
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Box>
    </>
  );
};

export default Info;
