import React from "react";

import LoginForm from "../../components/LoginForm";
import { useAuthContext } from "../../context/AuthProvider";

import styles from "./styles.module.scss";

const Login = () => {
  const { login } = useAuthContext();

  return (
    <div className={styles["wrapper"]}>
      <LoginForm onSubmit={login} />
    </div>
  );
};

export default Login;
