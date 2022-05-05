/**
 *
 * NavigationItemPopUp
 *
 */

//Design System
import { ModalLayout } from '@strapi/design-system/ModalLayout';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { getMessage } from '../../../../utils';
import { navigationItemType } from '../../utils/enums';
import { extractRelatedItemLabel, isRelationCorrect, isRelationPublished } from '../../utils/parsers';
import NavigationItemForm from '../NavigationItemForm';
import { NavigationItemPopupHeader } from './NavigationItemPopupHeader';



const NavigationItemPopUp = ({
  isOpen,
  isLoading,
  data,
  config = {},
  onSubmit,
  onClose,
  usedContentTypeItems,
  getContentTypeItems,
  usedContentTypesData,
}) => {


  const handleOnSubmit = (payload) => {
    onSubmit(payload);
  };

  const { related, relatedType } = data;
  const {
    availableAudience = [],
    additionalFields,
    contentTypes,
    contentTypeItems,
    contentTypesNameFields = {},
  } = config;


  const appendLabelPublicationStatus = (label = '', item = {}, isCollection = false) => {
    const appendix = isRelationPublished({
      relatedRef: item,
      type: item.isSingle ? navigationItemType.INTERNAL : item.type,
      isCollection,
    }) ? '' : `[${getMessage('notification.navigation.item.relation.status.draft')}] `.toUpperCase();
    return `${appendix}${label}`;
  };

  const relatedTypeItem = find(contentTypes, item => item.uid === relatedType);
  const prepareFormData = data => {
    const relatedItem = find(contentTypeItems, item => item.id === related);
    return {
      ...data,
      type: isRelationCorrect(data) ? data.type : undefined,
      related: related && isRelationCorrect(data) ? {
        value: related,
        label: appendLabelPublicationStatus(
          extractRelatedItemLabel({
            ...relatedItem,
            __collectionUid: relatedType,
          }, contentTypesNameFields, config),
          relatedItem,
        ),
      } : undefined,
      relatedType: relatedType && isRelationCorrect(data) ? {
        value: relatedType,
        label: appendLabelPublicationStatus(relatedTypeItem.label || relatedTypeItem.name, relatedTypeItem, true),
      } : undefined,
    };
  };

  return (
    <ModalLayout labelledBy="condition-modal-breadcrumbs" onClose={ onClose } isOpen={ isOpen }>
      <NavigationItemPopupHeader isNewItem={ !data.viewId } />
      <NavigationItemForm
        data={ prepareFormData(data) }
        isLoading={ isLoading }
        additionalFields={ additionalFields }
        contentTypesNameFields={ contentTypesNameFields }
        availableAudience={ availableAudience }
        contentTypes={ contentTypes }
        contentTypeEntities={ contentTypeItems }
        usedContentTypeEntities={ usedContentTypeItems }
        getContentTypeEntities={ getContentTypeItems }
        usedContentTypesData={ usedContentTypesData }
        onSubmit={ handleOnSubmit }
        onCancel={ onClose }
        appendLabelPublicationStatus={ appendLabelPublicationStatus }
      />
    </ModalLayout>

  );
};

NavigationItemPopUp.propTypes = {
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  getContentTypeItems: PropTypes.func.isRequired,
};

export default NavigationItemPopUp;
