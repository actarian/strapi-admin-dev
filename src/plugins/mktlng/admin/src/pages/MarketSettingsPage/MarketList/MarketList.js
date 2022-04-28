import { Button } from '@strapi/design-system/Button';
import { ContentLayout, EmptyStateLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import EmptyDocuments from '@strapi/icons/EmptyDocuments';
import Plus from '@strapi/icons/Plus';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useMarkets from '../../../hooks/useMarkets/useMarkets';
import { getTrad } from '../../../utils';
import MarketModalCreate from '../MarketModalCreate/MarketModalCreate';
import MarketModalDelete from '../MarketModalDelete/MarketModalDelete';
import MarketModalUpdate from '../MarketModalUpdate/MarketModalUpdate';
import MarketTable from '../MarketTable/MarketTable';

const MarketList = ({ canUpdate, canDelete, onToggleCreateModal, isCreating }) => {
  const { formatMessage } = useIntl();

  const [deleteItem, setDeleteItem] = useState();
  const [updateItem, setUpdateItem] = useState();
  const { markets } = useMarkets();

  useFocusWhenNavigate();

  // Delete actions
  const closeModalToDelete = () => setDeleteItem(undefined);
  const onDelete = canDelete ? setDeleteItem : undefined;

  // Edit actions
  const closeModalToEdit = () => setUpdateItem(undefined);
  /*
  const onUpdate = canUpdate ? ({ id, code, name, countries, languages, isDefault }) => {
    setUpdateItem({ id, code, name, countries: countries || [], languages: languages || [], isDefault });
  } : undefined;
  */
  const onUpdate = canUpdate ? setUpdateItem : undefined;

  return (
    <Main tabIndex={ -1 }>
      <HeaderLayout title={ formatMessage({ id: getTrad('settings.market.title'), defaultMessage: 'Languages' }) } subtitle={ formatMessage({ id: getTrad('settings.list.description') }) } primaryAction={
        <Button startIcon={ <Plus /> } onClick={ onToggleCreateModal } size="L">
          { formatMessage({ id: getTrad('settings.list.actions.add') }) }
        </Button>
      } />
      <ContentLayout>
        { markets?.length > 0 ? (
          <MarketTable markets={ markets } onDelete={ onDelete } onUpdate={ onUpdate } />
        ) : (
          <EmptyStateLayout
            icon={ <EmptyDocuments width={ undefined } height={ undefined } /> }
            content={ formatMessage({ id: getTrad('settings.list.empty.title') }) }
            action={ onToggleCreateModal ? (
              <Button variant="secondary" startIcon={ <Plus /> } onClick={ onToggleCreateModal }>
                { formatMessage({ id: getTrad('settings.list.actions.add') }) }
              </Button>
            ) : null }
          />
        ) }
      </ContentLayout>
      { isCreating && <MarketModalCreate onClose={ onToggleCreateModal } /> }
      { updateItem && <MarketModalUpdate item={ updateItem } onClose={ closeModalToEdit } /> }
      <MarketModalDelete item={ deleteItem } onClose={ closeModalToDelete } />
    </Main>
  );
};

MarketList.defaultProps = {
  onToggleCreateModal: undefined,
};

MarketList.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  onToggleCreateModal: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
};

export default MarketList;
