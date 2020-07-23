import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import Navbar from "../Navbar";
import Footer from "../Footer";

import styles from "./styles.module.scss";

const Layout = ({ children, title, description }) => {
  return (
    <div className={styles["container"]}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Navbar />
      <main className={styles["content"]}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Layout;
