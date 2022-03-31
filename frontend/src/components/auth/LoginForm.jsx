// import React, { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";

function LoginForm(props) {
  const { handleSubmit, toggleForm } = props;
  // NOTE: possible optimization (almost certainly unnecessary):
  // const submitFunction = useCallback((e) => {
  //   handleSubmit(e);
  // }, []);
  return (
    <form
      className="login-form-noVal"
      onSubmit={(e) => handleSubmit(e)}
      noValidate
    >
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="name@example.com"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="very_secure_password"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button
          type="button"
          id="signUpLink"
          className="btn btn-link"
          onClick={() => toggleForm()}
          aria-label="Account Sign Up Button"
        >
          Don&#39t have an account? Click here to sign up!
        </button>
      </div>
    </form>
  );
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;
