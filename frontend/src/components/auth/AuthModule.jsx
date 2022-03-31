import React, { useState } from "react";
import PropTypes from "prop-types";
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
    const { name, value } = event.target;

    // TODO: THIS VALIDATION IS FOR DEMO PURPOSES ONLY - REPLACE AS SOON AS THE BACKEND IS CONNECTED
    switch (name) {
      case "email":
        value === "test@user.com"
          ? event.target.setCustomValidity("")
          : event.target.setCustomValidity(
              "username or password is incorrect!"
            );
        event.target.checkValidity();
        break;
      case "password":
        value === "password123"
          ? event.target.setCustomValidity("")
          : event.target.setCustomValidity(
              "username or password is incorrect!"
            );
        event.target.checkValidity();
        break;
      default:
        event.target.checkValidity();
        break;
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // event.target.checkValidity();
    event.target.classList.remove("was-validated");
    // debugger;
    if (event.target.reportValidity()) {
      setAuthInfo({ ...authInfo, isLoggedIn: true });
    } else {
      event.target.classList.add("was-validated");
    }
    // return event.target.reportValidity();

    // TODO: send credentials to server (which sends them to db), set auth info based on server response
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
