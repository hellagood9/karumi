import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { sendRequest } from "../utils/sendRequest";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const localUserJson = localStorage.getItem("jwtToken");
      const localUser = localUserJson && JSON.parse(localUserJson);
      setUser(localUser);
    };

    getUserFromLocalStorage();
  }, []);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem("jwtToken", JSON.stringify(user));
  };

  const deleteUser = () => {
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  const login = async (user) => {
    const loggedUser = await sendRequest("login", user);
    if (!loggedUser) return;

    loggedUser && saveUser(loggedUser);
  };

  const logout = async () => {
    await sendRequest("logout", undefined);
    deleteUser();
  };

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
