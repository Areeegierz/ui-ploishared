import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => {
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route
          path={`${match.url}User`}
          component={asyncComponent(() => import("./User/index"))}
        />
        <Route
          path={`${match.url}`}
          component={asyncComponent(() => import("./Booking/index"))}
        />
      </Switch>
    </div>
  );
};

export default App;
