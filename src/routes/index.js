import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthenticatedAppRoutes from "./AuthenticatedAppRoutes";
import UnauthenticatedAppRoutes from "./UnauthenticatedAppRoutes";

const AppRoutes = () => {
  const user = true;

  return (
    <Router>
      {user ? <AuthenticatedAppRoutes /> : <UnauthenticatedAppRoutes />}
    </Router>
  );
};

export default AppRoutes;
