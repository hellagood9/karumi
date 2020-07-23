import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const user = { user: { username: "Jane Doe", name: "Jane Doe" } };

  const login = () => console.log("login");
  const logout = () => console.log("logout");
  const verifyUser = () => console.log("verifyUser");

  return (
    <AuthContext.Provider value={{ user, login, logout, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuthContext, AuthProvider };
