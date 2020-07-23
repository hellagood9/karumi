import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/karumi-logo.png";
import styles from "./styles.module.scss";

const Navbar = () => {
  const logout = () => console.log("Logout");
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["nav-left"]}>
        <div className={styles["logo"]}>
          <Link to="/">
            <img src={logo} alt="Karumi's logo" />
          </Link>
        </div>
      </div>
      <div className={styles["nav-right"]}>
        <ul className={styles["list"]}>
          <li data-testid="value" className={styles["list-item"]}>
            John Doe
          </li>
          <li>
            <button className={styles["btn"]} onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
