import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"; // TODO: maybe refactor and make the login form do both login and sign up

axios.defaults.withCredentials = true;

function AuthModule(props) {
  const { authInfo, setAuthInfo } = props;
  const [isActiveLoginForm, setIsActiveLoginForm] = useState(true);

  // this only runs when the component is first rendered
  useEffect(() => {
    async function checkUser() {
      // ask backend if a user is currently logged in
      // if so, set isLoggedIn (in authInfo) to true
      // this will bypass the login screen and immediately load the app
      // TODO: should i set isLoggedIn to false otherwise?
      const config = {
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_BASE_URL,
        url: "get-current-user/",
      };
      let response = null;
      try {
        response = await axios.request(config);
      } catch (err) {
        if (err?.response?.status === 401) {
          setAuthInfo((prevAuthInfo) => ({
            ...prevAuthInfo,
            isLoggedIn: false,
            username: "",
          }));
        } else {
          console.error(err); // eslint-disable-line no-console
        }
      }
      if (response != null) {
        setAuthInfo((prevAuthInfo) => ({
          ...prevAuthInfo,
          isLoggedIn: true,
          username: response.data.username,
        }));
      }
    }
    checkUser();
  }, []);

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
      setAuthInfo({
        ...authInfo,
        username: response.data.username,
        isLoggedIn: true,
      });
    }
  };

  const handleSignUpChange = (event) => {
    event.preventDefault();
    // clear validation and whatnot
    event.target.setCustomValidity("");

    const form = document.getElementById("signUp-form");

    // TODO: why doesn't the field highlight?
    if (
      // event.target.id === "password" ||
      event.target.id === "repeatPassword"
    ) {
      const passwordInput = document.getElementById("password");
      const repeatPasswordInput = document.getElementById("repeatPassword");
      if (passwordInput.value !== repeatPasswordInput.value) {
        event.target.setCustomValidity("passwords don't match!");
      }
    }

    form.classList.remove("was-validated");
    form.checkValidity();
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    event.target.classList.remove("was-validated");

    const config = {
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      url: "signup/",
      data: {
        username: event.target.username.value,
        first_name: event.target.firstName.value, // why no camel case? idk, ask django
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
      if (err?.response?.status === 400) {
        let knownError = false;
        if (err.response?.data?.email) {
          // email already exists
          knownError = true;
          event.target.email.setCustomValidity(
            "a user with this email already exists!"
          );
        }
        if (err.response?.data?.username) {
          // username already exists
          knownError = true;
          event.target.username.setCustomValidity(
            "this username is taken, please try another username"
          );
        }
        if (!knownError) {
          console.error(err.response); // eslint-disable-line no-console
        }
      } else {
        console.error(err); // eslint-disable-line no-console
      }
      event.target.classList.add("was-validated");
      event.target.reportValidity();
    }
    if (response != null) {
      // TODO: i don't particularly like that the password is returned to the frontend
      // at least it's hashed, but still...kinda feels like a security issue
      setAuthInfo({
        ...authInfo,
        username: response.data.username,
        isLoggedIn: true,
      });
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
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string,
  }).isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default AuthModule;
