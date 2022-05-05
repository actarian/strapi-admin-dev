import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Option, Select } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import Check from '@strapi/icons/Check';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../translations';

const NavigationHeader = ({
  activeNavigation,
  availableNavigations,
  structureHasErrors,
  structureHasChanged,
  handleChangeSelection,
  handleSave,
}) => {
  const { formatMessage } = useIntl();
  return (
    <HeaderLayout
      primaryAction={
        <Stack horizontal spacing={ 2 }>
          <Box width="10vw">
            <Select
              type="select"
              placeholder={ 'Change navigation' }
              name={ `navigationSelect` }
              onChange={ handleChangeSelection }
              value={ activeNavigation?.id }
              size="S"
              style={ null }
            >
              { availableNavigations.map(({ id, name }) => <Option key={ id } value={ id }>{ name }</Option>) }
            </Select >
          </Box>
          <Button
            onClick={ handleSave }
            startIcon={ <Check /> }
            disabled={ structureHasErrors || !structureHasChanged }
            type="submit"
          >
            { formatMessage(getTrad('submit.cta.save')) }
          </Button>
          {/* <MoreButton
              id="more"
              label="More"
              icon={<More />}
            /> */}
        </Stack>
      }
      title={ formatMessage({
        id: getTrad('header.title'),
        defaultMessage: 'UI Navigation',
      }) }
      subtitle={ formatMessage({
        id: getTrad('header.description'),
        defaultMessage: 'Define your portal navigation',
      }) }
    />
  );
};

export default NavigationHeader;
