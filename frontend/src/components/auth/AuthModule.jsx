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

    // form won't let you resubmit unless you remove this class
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

  const handleSignUpChange = (event) => {
    event.preventDefault();
    // clear validation and whatnot
    event.target.setCustomValidity("");

    const form = document.getElementById("signUp-form");

    // TODO: make sure passwords match! (do this on the backend as well!)

    form.classList.remove("was-validated");
    form.checkValidity();
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    event.target.classList.remove("was-validated");
    // TODO: send data to server, set auth info based on server response

    const config = {
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      url: "signup/",
      data: {
        id: event.target.username.value,
        first_name: event.target.firstName.value,
        last_name: event.target.lastName.value,
        email: event.target.email.value,
        password: event.target.password.value,
        repeatPassword: event.target.repeatPassword.value,
      },
    };
    let response = null;
    try {
      response = await axios.request(config);
    } catch (err) {
      // TODO: figure out what the server will respond when email/username is taken
      if (err?.response?.status === 404) {
        console.log("404 for some reason??"); // eslint-disable-line no-console
      } else {
        console.error(err); // eslint-disable-line no-console
      }
      event.target.classList.add("was-validated");
      event.target.reportValidity();
    }
    if (response != null) {
      // also catches undefined, just in case
      setAuthInfo({ ...authInfo, isLoggedIn: true });
    }
  };

  return isActiveLoginForm ? (
    <LoginForm
      handleSubmit={handleLoginSubmit}
      handleChange={handleLoginChange}
      toggleForm={toggleForm}
    />
  ) : (
    <SignUpForm
      handleSubmit={handleSignUpSubmit}
      handleChange={handleSignUpChange}
      toggleForm={toggleForm}
    />
  );
}
AuthModule.propTypes = {
  authInfo: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default AuthModule;
