import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useAuthContext } from "../../context/AuthProvider";

import Layout from "../../components/Globals/Layout";

import styles from "./styles.module.scss";

const Home = () => {
  const {
    user: { user },
    logout,
  } = useAuthContext();

  const [userInfo, setUserInfo] = useState();
  const [isValid, setisValid] = useState(false);

  const name = user && user.name;

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const localUserJson = localStorage.getItem("jwtToken");

      if (localUserJson) {
        const localUser = JSON.parse(localUserJson);
        setUserInfo(localUser.jwtoken);
      }
    };

    getUserFromLocalStorage();
  }, []);

  const verifyMe = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    const response = await fetch(`/.netlify/functions/me`, requestOptions);

    if (response.ok) {
      setisValid(true);
      setUserInfo(userInfo);
    } else if (response.status === 401) {
      logout();
    }
  };

  return (
    <Layout
      title="Welcome to Karumi"
      description="Karumi's technical challenge"
    >
      <div className={styles["content__inner"]}>
        <h1 className={styles["title"]}>Private Area</h1>
        <h2>Hello, {name}</h2>
        <button
          onClick={verifyMe}
          className={classNames(styles["btn"], styles["btn-primary"])}
        >
          Verify user
        </button>

        {isValid && (
          <p className={styles["verification"]}>{`User OK: ${userInfo.slice(
            0,
            40
          )}...`}</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
