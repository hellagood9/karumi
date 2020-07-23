import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { sendRequest } from "../utils/sendRequest";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem("jwtToken", JSON.stringify(user));
  };

  const login = async (user) => {
    const loggedUser = await sendRequest("login", user);
    if (!loggedUser) return;

    loggedUser && saveUser(loggedUser);
  };

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
