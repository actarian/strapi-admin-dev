import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LanguageList from './LanguageList/LanguageList';

const LanguagePage = ({ canRead, canCreate, canDelete, canUpdate }) => {
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const handleToggleModalCreate = canCreate ? () => setIsOpenedCreateModal(s => !s) : undefined;
  return canRead ? (
    <LanguageList canUpdate={ canUpdate } canDelete={ canDelete } onToggleCreateModal={ handleToggleModalCreate } isCreating={ isOpenedCreateModal } />
  ) : null;
};

LanguagePage.propTypes = {
  canRead: PropTypes.bool.isRequired,
  canCreate: PropTypes.bool.isRequired,
  canUpdate: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default LanguagePage;
