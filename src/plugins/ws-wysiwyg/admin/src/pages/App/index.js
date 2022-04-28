import { NotFound } from '@strapi/helper-plugin';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/settings/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
