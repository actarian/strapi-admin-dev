import { IconButton } from '@strapi/design-system/IconButton';
import { Stack } from '@strapi/design-system/Stack';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { onRowClick, stopPropagation } from '@strapi/helper-plugin';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

const MarketTable = ({ markets, onDelete, onUpdate }) => {
  const { formatMessage } = useIntl();

  return (
    <Table colCount={ 4 } rowCount={ markets.length + 1 }>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma" textColor="neutral600">{ formatMessage({ id: getTrad('settings.markets.row.id') }) }</Typography>
          </Th>
          <Th>
            <Typography variant="sigma" textColor="neutral600">{ formatMessage({ id: getTrad('settings.markets.row.code') }) }</Typography>
          </Th>
          <Th>
            <Typography variant="sigma" textColor="neutral600">{ formatMessage({ id: getTrad('settings.markets.row.name') }) }</Typography>
          </Th>
          <Th>
            <Typography variant="sigma" textColor="neutral600">{ formatMessage({ id: getTrad('settings.markets.row.default-market') }) }</Typography>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        { markets.map(market => (
          <Tr key={ market.id } { ...onRowClick({ fn: () => onUpdate(market), condition: onUpdate }) }>
            <Td>
              <Typography textColor="neutral800">{ market.id }</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{ market.code }</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{ market.name }</Typography>
            </Td>
            <Td>
              <Typography textColor="neutral800">{ market.isDefault ? formatMessage({ id: getTrad('settings.markets.default') }) : null }</Typography>
            </Td>
            <Td>
              <Stack horizontal spacing={ 1 } style={ { justifyContent: 'flex-end' } } { ...stopPropagation }>
                { onUpdate && (
                  <IconButton label={ formatMessage({ id: getTrad('settings.list.actions.edit') }) } noBorder onClick={ () => onUpdate(market) } icon={ <Pencil /> } />
                ) }
                { onDelete && !market.isDefault && (
                  <IconButton label={ formatMessage({ id: getTrad('settings.list.actions.delete') }) } noBorder onClick={ () => onDelete(market) } icon={ <Trash /> } />
                ) }
              </Stack>
            </Td>
          </Tr>
        )) }
      </Tbody>
    </Table>
  );
};

MarketTable.defaultProps = {
  markets: [],
  onDelete: undefined,
  onUpdate: undefined,
};

MarketTable.propTypes = {
  markets: PropTypes.array,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default MarketTable;
