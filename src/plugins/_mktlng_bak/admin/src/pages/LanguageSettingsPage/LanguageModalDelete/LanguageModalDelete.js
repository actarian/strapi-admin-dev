import { ConfirmDialog } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import React from 'react';
import useDeleteLocale from '../../../hooks/useDeleteLocale/useDeleteLocale';

const LanguageModalDelete = ({ item, onClose }) => {
  const { isDeleting, deleteLocale } = useDeleteLocale();

  const isOpened = Boolean(item);

  const handleDelete = () => deleteLocale(item.id).then(onClose);

  return (
    <ConfirmDialog
      isConfirmButtonLoading={ isDeleting }
      onConfirm={ handleDelete }
      onToggleDialog={ onClose }
      isOpen={ isOpened }
    />
  );
};

LanguageModalDelete.defaultProps = {
  item: undefined,
};

LanguageModalDelete.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default LanguageModalDelete;
