import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MarketList from './MarketList/MarketList';

const MarketPage = ({ canRead, canCreate, canDelete, canUpdate }) => {
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const handleToggleModalCreate = canCreate ? () => setIsOpenedCreateModal(s => !s) : undefined;
  return canRead ? (
    <MarketList canUpdate={ canUpdate } canDelete={ canDelete } onToggleCreateModal={ handleToggleModalCreate } isCreating={ isOpenedCreateModal } />
  ) : null;
};

MarketPage.propTypes = {
  canRead: PropTypes.bool.isRequired,
  canCreate: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default MarketPage;
