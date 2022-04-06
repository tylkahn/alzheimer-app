// import React, { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";

function LoginForm(props) {
  const { handleSubmit, handleChange, toggleForm } = props;
  // NOTE: possible optimization (almost certainly unnecessary):
  // const submitFunction = useCallback((e) => {
  //   handleSubmit(e);
  // }, []);
  return (
    <>
      <div className="invalid-feedback">Username or password is incorrect!</div>
      <form
        className="login-form-noVal"
        onSubmit={(e) => handleSubmit(e)}
        // noValidate
      >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control mb-2"
            placeholder="name@example.com"
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control mb-4"
            placeholder="totally_legit_and_secure_password_example"
            onChange={(e) => handleChange(e)}
            required
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
            Don&#39;t have an account? Click here to sign up!
          </button>
        </div>
      </form>
    </>
  );
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;
