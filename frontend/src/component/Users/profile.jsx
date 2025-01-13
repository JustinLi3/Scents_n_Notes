import React, { useState, useEffect } from "react";
import Axios from "axios";
import BaseLayout from "../Blog/baseLayout";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: "/default-profile.png", // Default profile image
  });
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    Axios.get("/api/profile/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        setUser({
          username: response.data.username || "",
          email: response.data.email || "",
          profileImage: response.data.image || "/default-profile.png",
        });
        setError(""); // Clear any existing errors
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again later.");
      });
  }, []);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    if (newImage) {
      formData.append("image", newImage);
    }

    Axios.post("/api/profile/update/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        setSuccess("Profile updated successfully!");
        setUser((prevState) => ({
          ...prevState,
          profileImage: response.data.image || prevState.profileImage,
        }));
        setError(""); // Clear any existing errors
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("Error updating profile. Please try again.");
        setSuccess(""); // Clear any success messages
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <BaseLayout title="Profile">
      <div className="content-section">
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setError("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setSuccess("")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {/* User Info */}
        <div className="media">
          <img
            className="rounded-circle account-img"
            src={user.profileImage}
            alt="Profile"
            style={{ width: "150px", height: "150px" }}
          />
          <div className="media-body">
            <h2 className="account-heading">{user.username}</h2>
            <p className="text-secondary">{user.email}</p>
          </div>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <fieldset className="form-group">
            <legend className="border-bottom mb-4">Profile Info</legend>
            <div className="form-group">
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                required
              />
              <small className="form-text text-muted">
                Required. 150 characters or fewer. Letters, digits, and @/./+/-/_ only.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image*</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
              {user.profileImage && (
                <small className="form-text text-muted">
                  Currently: <img src={user.profileImage} alt="Current" style={{ width: "50px", marginLeft: "10px" }} />
                </small>
              )}
            </div>
          </fieldset>
          <div className="form-group">
            <button className="btn btn-outline-info" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Profile;
