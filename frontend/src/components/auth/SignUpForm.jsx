// import React, { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";

function SignUpForm(props) {
  const { handleSubmit, handleChange, toggleForm } = props;
  return (
    <form
      className="signUp-form"
      onSubmit={(e) => handleSubmit(e)}
      id="signUp-form"
    >
      <div className="form-row">
        <div className="form-group col-md-6">
          <label className="col-form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-control"
            placeholder="John"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label className="col-form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-control"
            placeholder="Smith"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
          minLength="5"
          required
        />
      </div>
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
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="totally_legit_and_secure_password_example"
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="repeatPassword">Re-enter your password</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          className="form-control mb-2"
          placeholder="totally_legit_and_secure_password_example"
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <button
          type="button"
          id="loginLink"
          className="btn btn-link"
          onClick={() => toggleForm()}
          aria-label="Login Button"
        >
          Already have an account? Click here to login!
        </button>
      </div>
    </form>
  );
}
SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default SignUpForm;
