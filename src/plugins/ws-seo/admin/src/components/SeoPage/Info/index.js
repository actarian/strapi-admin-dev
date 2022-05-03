import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Flex } from '@strapi/design-system/Flex';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Tab, TabGroup, TabPanel, TabPanels, Tabs } from '@strapi/design-system/Tabs';
import { Typography } from '@strapi/design-system/Typography';
import Check from '@strapi/icons/Check';
import Plus from '@strapi/icons/Plus';
import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';
import { Illo } from '../Info/EmptyComponentLayout/illo';

const Info = ({ contentTypes }) => {
  const { formatMessage } = useIntl();
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
              <Table colCount={ 2 } rowCount={ contentTypes.collectionTypes.length }>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { contentTypes &&
                    contentTypes.collectionTypes &&
                    !_.isEmpty(contentTypes.collectionTypes) ? (
                    contentTypes.collectionTypes.map((item) => (
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
                                { formatMessage({ id: getTrad('page.info.added'), defaultMessage: 'Added' }) }
                              </LinkButton>
                            ) : (
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
              <Table colCount={ 2 } rowCount={ contentTypes.singleTypes.length }>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography variant="sigma">Name</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  { contentTypes &&
                    contentTypes.singleTypes &&
                    !_.isEmpty(contentTypes.singleTypes) ? (
                    contentTypes.singleTypes.map((item) => (
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
