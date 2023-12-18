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
          path={`${match.url}content`}
          exact
          component={asyncComponent(() => import("./Content/index"))}
        />

        <Route
          path={`${match.url}staffcontent`}
          exact
          component={asyncComponent(() => import("./StaffContent/index"))}
        />
      </Switch>
    </div>
  );
};

export default App;
