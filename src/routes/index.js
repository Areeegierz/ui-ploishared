import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => {
  return (
    <div
      style={{ fontFamily: "CPAC_MODERN_MEDIUM" }}
      className="gx-main-content-wrapper"
    >
      <Switch>
        <Route
          path={`${match.url}Search`}
          exact
          component={asyncComponent(() => import("./Search/index"))}
        />

        <Route
          path={`${match.url}User`}
          exact
          component={asyncComponent(() => import("./User/index"))}
        />

        <Route
          path={`${match.url}Booking`}
          exact
          component={asyncComponent(() => import("./Booking/index"))}
        />
        <Route
          path={`${match.url}Car`}
          exact
          component={asyncComponent(() => import("./Car/index"))}
        />
        <Route
          path={`${match.url}SearchDetail/:id`}
          exact
          component={asyncComponent(() => import("./Search/detail"))}
        />
      </Switch>
    </div>
  );
};

export default App;
