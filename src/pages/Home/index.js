import React from "react";
import classNames from "classnames";
import { useAuthContext } from "../../context/AuthProvider";

import Layout from "../../components/Globals/Layout";

import styles from "./styles.module.scss";

const Home = () => {
  const {
    user: { user },
  } = useAuthContext();

  const verifyMe = () => console.log("verifyMe");

  const name = user && user.name;

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
      </div>
    </Layout>
  );
};

export default Home;
