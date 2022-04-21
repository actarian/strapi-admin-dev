import { Button } from '@strapi/design-system/Button';
import { ContentLayout, EmptyStateLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { useFocusWhenNavigate } from '@strapi/helper-plugin';
import EmptyDocuments from '@strapi/icons/EmptyDocuments';
import Plus from '@strapi/icons/Plus';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useLocales from '../../../hooks/useLocales/useLocales';
import { getTrad } from '../../../utils';
import LanguageModalCreate from '../LanguageModalCreate/LanguageModalCreate';
import LanguageModalDelete from '../LanguageModalDelete/LanguageModalDelete';
import LanguageModalUpdate from '../LanguageModalUpdate/LanguageModalUpdate';
import LanguageTable from '../LanguageTable/LanguageTable';

const LanguageList = ({ canUpdate, canDelete, onToggleCreateModal, isCreating }) => {
  const { formatMessage } = useIntl();

  const [deleteItem, setDeleteItem] = useState();
  const [toUpdate, setUpdateItem] = useState();
  const { locales } = useLocales();

  useFocusWhenNavigate();

  // Delete actions
  const closeModalToDelete = () => setDeleteItem(undefined);
  const onDelete = canDelete ? setDeleteItem : undefined;

  // Edit actions
  const closeModalToEdit = () => setUpdateItem(undefined);
  const onUpdate = canUpdate ? setUpdateItem : undefined;

  return (
    <Main tabIndex={ -1 }>
      <HeaderLayout title={ formatMessage({ id: getTrad('settings.language.title'), defaultMessage: 'Languages' }) } subtitle={ formatMessage({ id: getTrad('settings.list.description') }) } primaryAction={
        <Button startIcon={ <Plus /> } onClick={ onToggleCreateModal } size="L">
          { formatMessage({ id: getTrad('settings.list.actions.add') }) }
        </Button>
      } />
      <ContentLayout>
        { locales?.length > 0 ? (
          <LanguageTable locales={ locales } onDelete={ onDelete } onUpdate={ onUpdate } />
        ) : (
          <EmptyStateLayout icon={ <EmptyDocuments width={ undefined } height={ undefined } /> } content={ formatMessage({ id: getTrad('settings.list.empty.title') }) } action={
            onToggleCreateModal ? (
              <Button variant="secondary" startIcon={ <Plus /> } onClick={ onToggleCreateModal }>
                { formatMessage({ id: getTrad('settings.list.actions.add') }) }
              </Button>
            ) : null
          } />
        ) }
      </ContentLayout>
      { isCreating && <LanguageModalCreate onClose={ onToggleCreateModal } /> }
      { toUpdate && <LanguageModalUpdate item={ toUpdate } onClose={ closeModalToEdit } /> }
      <LanguageModalDelete item={ deleteItem } onClose={ closeModalToDelete } />
    </Main>
  );
};

LanguageList.defaultProps = {
  onToggleCreateModal: undefined,
};

LanguageList.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  onToggleCreateModal: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
};

export default LanguageList;
