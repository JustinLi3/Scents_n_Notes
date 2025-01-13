import React, { useState } from "react";
import Axios from "axios";
import BaseLayout from "../Blog/baseLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function


  const dismissAlert = () => {
    setShowAlert(false);
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password1: data.password,
        password2: data.passwordConfirm,
      };

      const csrfToken = getCookie("csrftoken");

      const response = await Axios.post(
        "http://127.0.0.1:8000/api/register_api/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      setErrorMessage({});
      setSuccessMessage(response.data.message || "Registration successful!");
      navigate("/login", { state: { message: "Registration successful! Please log in." } });

    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.data?.errors) {
        setErrorMessage(error.response.data.errors);
      } else {
        setErrorMessage({ non_field_errors: ["An unexpected error occurred."] });
      }

      setSuccessMessage("");
    }
  };

  return (
    <BaseLayout title="Register">
      <div className="content-section border border-muted p-3 rounded">
        {/* Dismissible Alert for Errors */}
        {showAlert && Object.keys(errorMessage).length > 0 && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={dismissAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>Warning:</strong>
            <ul>
              {Object.entries(errorMessage).map(([field, messages]) =>
                messages.map((message, index) => (
                  <li key={`${field}-${index}`}>
                    {field}: {message}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Success Message */}
        {successMessage && <p className="text-success">{successMessage}</p>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <fieldset className="form-group">
            <div className="form-group">
              <label htmlFor="username">Username*</label>
              <input
                className="form-control"
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              <small className="form-text text-muted">
                Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
              </small>
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <ul className="form-text text-muted">
                <li>Your password can’t be too similar to your other personal information.</li>
                <li>Your password must contain at least 8 characters.</li>
                <li>Your password can’t be a commonly used password.</li>
                <li>Your password can’t be entirely numeric.</li>
              </ul>
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Password confirmation</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Password confirmation is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <small className="form-text text-muted">
                Enter the same password as before, for verification.
              </small>
              {errors.passwordConfirm && (
                <span className="text-danger">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-outline-info" type="submit">
                Sign Up
              </button>
            </div>
            <legend className="border-bottom mb-4">Register</legend>
          </fieldset>
        </form>
        <div className="border-top pt-3">
          <small className="text-muted">
            Already Have An Account?
            <a className="ml-2" href="{% url 'login' %}">
              Sign In
            </a>
          </small>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Register;
