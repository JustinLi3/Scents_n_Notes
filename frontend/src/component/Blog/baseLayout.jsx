import React, { useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import useAuth to manage user state and logout

const BaseLayout = ({ title, messages, children }) => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  useEffect(() => {
    document.title = title ? `S&N - ${title}` : "S&N";
  }, [title]);

  return (
    <>
      {/* Meta and Links */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" type="text/css" href="/static/blog/main.css" crossOrigin="anonymous" />
      <title>{title || "Scents & Notes"}</title>

      {/* Header with Navbar */}
      <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <div className="container">
            <a
              className="navbar-brand mr-4"
              style={{ fontFamily: "Mrs Saint Delafield", fontSize: "40px" }}
              href="/"
            >
              Scents &amp; Notes
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggle"
              aria-controls="navbarToggle"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggle">
              {/* Left-Side Navigation */}
              <div className="navbar-nav mr-auto">
                <a className="nav-item nav-link" href="/">
                  Home
                </a>
                <a className="nav-item nav-link" href="/about">
                  About
                </a>
              </div>

              {/* Right-Side Navigation */}
              <div className="navbar-nav">
                {user ? ( // Show these items if the user is logged in
                  <>
                    <a className="nav-item nav-link" href="/post-create">
                      New Post
                    </a>
                    <a className="nav-item nav-link" href="/profile">
                      Profile
                    </a>
                    <button
                      className="btn btn-link nav-item nav-link"
                      onClick={() => {
                        logout(); // Call logout function from AuthContext
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // Show these items if the user is not logged in
                  <>
                    <a className="nav-item nav-link" href="/login">
                      Login
                    </a>
                    <a className="nav-item nav-link" href="/register">
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main role="main" className="container" style={{ marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-8">
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => (
                <div key={index} className={`alert alert-${message.type}`}>
                  {message.text}
                </div>
              ))}
            {children}
          </div>
          <div className="col-md-4">
            <div className="content-section">
              <h3>Our Sidebar</h3>
              <ul className="list-group">
                <li className="list-group-item list-group-item-light">Latest Posts</li>
                <li className="list-group-item list-group-item-light">Announcements</li>
                <li className="list-group-item list-group-item-light">Calendars</li>
                <li className="list-group-item list-group-item-light">etc</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Scripts */}
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default BaseLayout;
