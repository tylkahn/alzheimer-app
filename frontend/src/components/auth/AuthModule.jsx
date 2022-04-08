import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"; // TODO: maybe refactor and make the login form do both login and sign up

function AuthModule(props) {
  const { authInfo, setAuthInfo } = props;
  const [isActiveLoginForm, setIsActiveLoginForm] = useState(true);

  const toggleForm = () => {
    setIsActiveLoginForm(!isActiveLoginForm);
  };

  const handleLoginChange = (event) => {
    event.preventDefault();

    const input1 = document.getElementById("emailOrUsername");
    const input2 = document.getElementById("password");
    const form = document.getElementById("login-form");

    input1.setCustomValidity(""); // empty string = input is valid
    input2.setCustomValidity("");

    form.classList.remove("was-validated");
    form.checkValidity();
  };

  // send credentials to server (which sends them to db), set auth info based on server response
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    event.target.classList.remove("was-validated");

    const config = {
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      url: "login/",
      data: {
        id: event.target.emailOrUsername.value,
        password: event.target.password.value,
      },
    };
    let response = null;
    try {
      response = await axios.request(config);
    } catch (err) {
      if (err?.response?.status === 404) {
        console.log("username or password is incorrect!"); // eslint-disable-line no-console
      } else {
        console.error(err); // eslint-disable-line no-console
      }
    }
    if (response == null) {
      // also catches undefined, just in case
      event.target.emailOrUsername.setCustomValidity(
        "username or password is incorrect!"
      );
      event.target.password.setCustomValidity(
        "username or password is incorrect!"
      );
      event.target.classList.add("was-validated");
      event.target.reportValidity();
    } else {
      setAuthInfo({ ...authInfo, isLoggedIn: true });
    }
  };

  const handleSignUpSubmit = () => {
    // TODO: send data to server, set auth info based on server response
  };

  return isActiveLoginForm ? (
    <LoginForm
      handleSubmit={handleLoginSubmit}
      handleChange={handleLoginChange}
      toggleForm={toggleForm}
    />
  ) : (
    <SignUpForm handleSubmit={handleSignUpSubmit} toggleForm={toggleForm} />
  );
}
AuthModule.propTypes = {
  authInfo: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default AuthModule;
