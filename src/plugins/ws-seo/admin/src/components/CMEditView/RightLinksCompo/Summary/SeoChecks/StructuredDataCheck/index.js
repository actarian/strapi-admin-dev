import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../../Summary';
import SEOAccordion from '../SEOAccordion';





const StructuredDataCheck = ({ structuredData, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('checks.structuredDataCheck.default'),
      defaultMessage:
        'A Structured Data json has been found! However we can validate the accuracy of its content.',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isEmpty(structuredData)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.structuredDataCheck.not-found'),
          defaultMessage: 'No Structured Data json has been found.',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.structuredData))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'structuredData' },
      });
  }, []);

  return (
    <SEOAccordion
      title="JSON Structured Data"
      status={checks.structuredData}
      label={formatMessage({
        id: getTrad('checks.structuredDataCheck.label'),
        defaultMessage:
          'Structured data is a standardized format for providing information about a page and classifying the page content.',
      })}
    />
  );
};

export default StructuredDataCheck;
