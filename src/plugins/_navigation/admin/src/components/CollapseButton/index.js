import { Flex } from '@strapi/design-system/Flex';
import { Icon } from '@strapi/design-system/Icon';
import { Typography } from '@strapi/design-system/Typography';
import { CarretDown, CarretUp } from '@strapi/icons';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 50%;
	background: #DCDCE4;
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 8px;
`;

const CollapseButton = ({ toggle, collapsed, itemsCount }) => (
  <Flex justifyContent='space-between' alignItems='center' onClick={ toggle } cursor="pointer" style={ { marginRight: '16px' } }>
    <Wrapper>
      { collapsed ?
        <Icon as={ CarretDown } width='7px' height='4px' /> :
        <Icon as={ CarretUp } width='7px' height='4px' />
      }
    </Wrapper>
    <Typography variant="pi">{ itemsCount } nested items</Typography>
  </Flex >
);

export default CollapseButton;
