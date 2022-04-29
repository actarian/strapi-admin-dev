/*
 *
 * HomePage
 *
 */

import { Box } from '@strapi/design-system/Box';
import { ContentBox, LoadingIndicatorPage, useAutoReloadOverlayBlocker } from '@strapi/helper-plugin';
import InformationSquare from '@strapi/icons/InformationSquare';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Header from '../../components/SeoPage/Header';
import Info from '../../components/SeoPage/Info';
import { getTrad } from '../../utils';
import { createSeoComponent, fetchContentTypes, fetchSeoComponent } from '../../utils/api';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const { lockAppWithAutoreload, unlockAppWithAutoreload } = useAutoReloadOverlayBlocker();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldEffect, setShouldEffect] = useState(false);
  const seoComponent = useRef({});
  const contentTypes = useRef({});

  // Fetching the SEO component & Content-Types
  useEffect(async () => {
    seoComponent.current = await fetchSeoComponent();
    contentTypes.current = await fetchContentTypes();
    if (!seoComponent.current) {
      try {
        lockAppWithAutoreload();
        await createSeoComponent();
      } catch (error) {
        console.log(error);
      } finally {
        unlockAppWithAutoreload();
        setShouldEffect(true);
      }
    }
    setIsLoading(false);
  }, [shouldEffect]);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <Header seoComponent={ seoComponent.current } />
      <Box paddingLeft={ 8 } paddingRigth={ 8 }>
        <ContentBox
          title={ formatMessage({
            id: 'Information',
            defaultMessage: 'Information',
          }) }
          subtitle={ formatMessage({
            id: getTrad('SEOPage.info.information'),
            defaultMessage:
              "When adding your SEO component, make sure to name it 'seo' and to include it in the root of your Content-Type.",
          }) }
          icon={ <InformationSquare /> }
          iconBackground="primary100"
        />
      </Box>
      <Info contentTypes={ contentTypes.current } />
    </>
  );
};

export default memo(HomePage);
