/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { LoadingIndicatorPage, NotFound } from "@strapi/helper-plugin";
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import pluginId from "../../pluginId";
// Utils
import DataManagerProvider from "../DataManagerProvider";
// Containers
const View = lazy(() => import("../View"));

const App = () => {
  return (
    <DataManagerProvider>
      <Suspense fallback={ <LoadingIndicatorPage /> }>
        <Switch>
          <Route path={ `/plugins/${pluginId}` } component={ View } exact />
          <Route component={ NotFound } />
        </Switch>
      </Suspense>
    </DataManagerProvider>
  );
};

export default App;
