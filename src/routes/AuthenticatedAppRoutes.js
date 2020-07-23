import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Home from "../pages/Home";
import NoMatch from "../components/Globals/NoMatch";

const AuthenticatedAppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default AuthenticatedAppRoutes;
