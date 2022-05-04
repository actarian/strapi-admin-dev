/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { NotFound } from '@strapi/helper-plugin';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import pluginId from '../../pluginId';
import Pages from '../Pages/Pages';

const Router = () => {
  return (
    <div>
      <Switch>
        <Route path={ `/plugins/${pluginId}` } component={ Pages } exact />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
};

export default Router;
