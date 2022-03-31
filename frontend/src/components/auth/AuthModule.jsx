import React, { useState } from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"; // TODO: maybe refactor and make the login form do both login and sign up

function AuthModule(props) {
  // const { authInfo, setAuthInfo } = props;
  const { setAuthInfo } = props;
  const [isActiveLoginForm, setIsActiveLoginForm] = useState(true);
  const toggleForm = () => {
    setIsActiveLoginForm(!isActiveLoginForm);
  };
  const handleLoginSubmit = (event) => {
    console.log("handleLoginSubmit running:");
    console.log(event);
    setAuthInfo({ isLoggedIn: true });
    // TODO: send credentials to server (which sends them to db), set auth info based on server response
  };
  const handleSignUpSubmit = () => {
    // TODO: send data to server, set auth info based on server response
  };

  return isActiveLoginForm ? (
    <LoginForm handleSubmit={handleLoginSubmit} toggleForm={toggleForm} />
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
