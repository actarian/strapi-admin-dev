import { ConfirmDialog } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import React from 'react';
import useDeleteMarket from '../../../hooks/useDeleteMarket/useDeleteMarket';

const MarketModalDelete = ({ item, onClose }) => {
  const { isDeleting, deleteMarket } = useDeleteMarket();
  const isOpened = Boolean(item);

  const handleDelete = () => deleteMarket(item.id).then(onClose);

  return (
    <ConfirmDialog
      isConfirmButtonLoading={ isDeleting }
      onConfirm={ handleDelete }
      onToggleDialog={ onClose }
      isOpen={ isOpened }
    />
  );
};

MarketModalDelete.defaultProps = {
  item: undefined,
};

MarketModalDelete.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MarketModalDelete;
