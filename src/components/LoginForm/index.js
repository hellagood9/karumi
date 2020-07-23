import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import logo from "../../assets/images/karumi-logo.png";

import styles from "./styles.module.scss";

const LoginForm = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Min 6 characters";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
    ) {
      errors.username = "Invalid username (email address)";
    }

    return errors;
  };

  const [formState, setFormState] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const { username, password } = formState;

  const isInvalid = Object.keys(validate({ username, password })).length > 0;

  useEffect(() => {
    setErrors(validate({ username, password }));

    if (!isInvalid) {
      setShowToast(false);
    }
  }, [isInvalid, username, password]);

  const handleOnChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleOnBlur = () => {
    setTouched(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isInvalid) {
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({ username, password });
      setFormState(initialValues);
      setTouched(false);
      setShowToast(false);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["logo"]}>
        <img src={logo} alt="Karumi's logo" />
      </div>

      <div className={styles["input-row"]}>
        <input
          type="email"
          name="username"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => handleOnChange(e)}
          onBlur={handleOnBlur}
          value={username}
          className={classNames(
            {
              [styles["has-error"]]: touched && errors.username,
            },
            [styles["form-control"]]
          )}
        />

        {touched && (
          <div className={classNames(styles.feedback, styles.error)}>
            <small>{errors.username}</small>
          </div>
        )}
      </div>

      <div className={styles["input-row"]}>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => handleOnChange(e)}
          onBlur={handleOnBlur}
          value={password}
          className={classNames(
            {
              [styles["has-error"]]: touched && errors.password,
            },
            [styles["form-control"]]
          )}
        />

        {touched && (
          <div className={classNames(styles.feedback, styles.error)}>
            <small>{errors.password}</small>
          </div>
        )}
      </div>

      {showToast && (
        <p className={classNames(styles.feedback, styles.error)}>
          Username or Password incorrect!
        </p>
      )}

      <div className={styles["input-row"]}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={classNames(styles["btn"], styles["btn-primary"])}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
