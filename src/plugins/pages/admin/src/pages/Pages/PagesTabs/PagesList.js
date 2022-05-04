import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Flex } from '@strapi/design-system/Flex';
import { LinkButton } from '@strapi/design-system/LinkButton';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import ArrowRight from '@strapi/icons/ArrowRight';
import Plus from '@strapi/icons/Plus';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Illo } from '../../../Icons/Illo';
import { getTrad } from '../../../utils';
import { getPages } from '../../../utils/api';

function PagesList() {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true);

  const pages = useRef([]);

  async function fetchData() {
    if (!loading) {
      setLoading(true);
    }
    const items = await getPages();
    console.log('items', items);
    pages.current = items;
    setLoading(false);
  };

  // Fetching the Meta component & Content-Types
  useEffect(async () => {
    await fetchData();
  }, []);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (loading) {
    return <LoadingIndicatorPage />;
  }

  const items = pages.current || [];

  function getLink(item) {
    const contentType = item.contentType;
    const link = contentType.kind === 'collectionType' ?
      `/content-manager/${contentType.kind}/${contentType.uid}/${item.id}` :
      `/content-manager/${contentType.kind}/${contentType.uid}`;
    return link;
  }

  console.log(items);

  return (
    <Table colCount={ 2 } rowCount={ items.length }>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">Title</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Slug</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Collection</Typography>
          </Th>
          <Th>
            <Typography variant="sigma">Kind</Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        { items.length ? items.map((item) => (
          <Tr key={ item.contentType.globalId + '-' + item.id }>
            <Td>
              <Typography textColor="neutral800">
                { item.title }
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                { item.slug }
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                { item.contentType.globalId }
              </Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">
                { item.contentType.kind }
              </Typography>
            </Td>
            <Td>
              <Flex justifyContent="right" alignItems="right">
                <LinkButton to={ getLink(item) } endIcon={ <ArrowRight /> }>
                  { formatMessage({ id: getTrad('page.edit'), defaultMessage: 'Edit' }) }
                </LinkButton>
              </Flex>
            </Td>
          </Tr>
        )) : (
          <Box padding={ 8 } background="neutral0">
            <EmptyStateLayout icon={ <Illo /> }
              content={ formatMessage({ id: getTrad('page.no-pages'), defaultMessage: "You don't have any page content yet..." }) }
              action={
                <LinkButton to="/content-manager" variant="secondary" startIcon={ <Plus /> }>
                  { formatMessage({ id: getTrad('page.create-page'), defaultMessage: 'Create your first page content' }) }
                </LinkButton>
              }
            />
          </Box>
        ) }
      </Tbody>
    </Table>
  );
};

export default PagesList;
