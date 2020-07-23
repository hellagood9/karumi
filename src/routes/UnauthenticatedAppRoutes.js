import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Login from "../pages/Login";
import NoMatch from "../components/Globals/NoMatch";

const UnauthenticatedAppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default UnauthenticatedAppRoutes;
