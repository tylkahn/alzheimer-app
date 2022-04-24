import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

function LogoutButton(props) {
  const { setAuthInfo } = props;

  const handleClick = async () => {
    const config = {
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
      url: "logout/",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    let response = null;
    try {
      response = await axios.request(config);
    } catch (err) {
      if (err?.response?.status === 422) {
        // user was not logged in to begin with, i guess set authInfo anyway?
        response = "expected-ish failure";
      } else {
        // unknown error
        console.error(err); // eslint-disable-line no-console
      }
    }
    if (response != null) {
      // TODO: do i need to clear the session cookie?
      setAuthInfo((prevAuthInfo) => ({
        ...prevAuthInfo,
        isLoggedIn: false,
        username: "",
      }));
    }
  };
  // render a button
  // when clicked:
  //   make a call to backend to logout user
  //     catch any errors
  //   set authInfo.isLoggedIn to false and authInfo.username to an empty string
  return (
    <button
      id="logoutButton"
      className="btn btn-outline-danger"
      type="button"
      onClick={() => handleClick()}
    >
      Logout
    </button>
  );
}
LogoutButton.propTypes = {
  // authInfo: PropTypes.shape({
  //   isLoggedIn: PropTypes.bool,
  //   username: PropTypes.string,
  // }).isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default LogoutButton;
