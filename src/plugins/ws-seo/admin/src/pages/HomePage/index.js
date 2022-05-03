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
  const metaComponent = useRef({});
  const contentTypes = useRef({});

  // Fetching the Meta component & Content-Types
  useEffect(async () => {
    metaComponent.current = await fetchSeoComponent();
    contentTypes.current = await fetchContentTypes();
    if (!metaComponent.current) {
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
      <Header metaComponent={ metaComponent.current } />
      { false &&
        <Box paddingLeft={ 8 } paddingRigth={ 8 }>
          <ContentBox
            title={ formatMessage({ id: 'Information', defaultMessage: 'Information' }) }
            subtitle={ formatMessage({ id: getTrad('page.info.information'), defaultMessage: "When adding your Meta component, make sure to name it 'meta' and to include it in the root of your Content-Type." }) }
            icon={ <InformationSquare /> }
            iconBackground="primary100"
          />
        </Box>
      }
      <Info contentTypes={ contentTypes.current } />
    </>
  );
};

export default memo(HomePage);
