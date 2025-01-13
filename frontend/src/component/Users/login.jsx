import React, { useState } from "react";
import BaseLayout from "../Blog/baseLayout";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import Axios from "axios";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation(); // Access the state passed from the Register component
  const navigate = useNavigate(); // Initialize the navigate function

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ""
  ); // Display the message passed from the register page

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("http://127.0.0.1:8000/api/token/", {
        username: data.username,
        password: data.password,
      });

      // Save tokens to localStorage (or context if preferred)
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      setSuccessMessage("Login successful!");
      setErrorMessage("");

      // Redirect to the homepage or dashboard after login
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid username or password");
      setSuccessMessage("");
    }
  };

  return (
    <BaseLayout title="Login">
      <div className="content-section border border-muted p-3 rounded">
        {/* Display Success Message */}
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {successMessage}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setSuccessMessage("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {/* Display Error Message */}
        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {errorMessage}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setErrorMessage("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <fieldset className="form-group">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                placeholder="Enter username"
                {...register("username")}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                {...register("password")}
                required
              />
            </div>
            <legend className="border-bottom mb-4">Log In</legend>
          </fieldset>
          <div className="form-group">
            <button className="btn btn-sm btn-outline-info" type="submit">
              Login
            </button>
            <small className="text-muted ml-4">
              <a href="/password_reset/">Forgot Password?</a>
            </small>
          </div>
        </form>
        <div className="border-top pt-3">
          <small className="text-muted">
            Need an Account?
            <a className="ml-2" href="/register/">
              Sign Up
            </a>
          </small>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Login;
