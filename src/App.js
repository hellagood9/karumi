import React from "react";
import { AuthProvider } from "./context/AuthProvider";

import AppRoutes from "./routes";

import "./styles/base.scss";
import "./styles/typography.scss";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
