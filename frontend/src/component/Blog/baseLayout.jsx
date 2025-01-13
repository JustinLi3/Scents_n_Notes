import React, { useEffect } from "react"

// Customizable with title and messages being visible but user replaces {% if user.is_authenticated %} and children replaces {% block content %}{% endblock content %}
const BaseLayout = ({title, user, messages, children}) => { 
  useEffect(()=>{
    document.title = title ? `S&N - ${title}` : "S&N";
  }, [title])
  return(
  <> 
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"/>
        {/* Replace the static file reference */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap" rel="stylesheet" crossOrigin="anonymous"></link>
        <link rel="stylesheet" type="text/css" href="/static/blog/main.css" crossOrigin="anonymous"/>
        {}
        <title>{title || "Scents & Notes"}</title> 

      </>
      
        <header className="site-header">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
              <a className=" navbar-brand mr-4" style={{fontFamily:"Mrs Saint Delafield", fontSize:"40px"}} href="/">
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
                <div className="navbar-nav mr-auto">
                  <a className="nav-item nav-link" href="/">
                    Home
                  </a>
                  <a className="nav-item nav-link" href="/about">
                    About
                  </a>
                </div>
                {/* Navbar Right Side */}
                <div className="navbar-nav">
                  {user?.isAuthenticated ? (
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
                          // Add logout functionality here
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
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
        <main role="main" className="container" style={{marginTop:"120px"}}>
          <div className="row">
            <div className="col-md-8">
              {messages && messages.length > 0 && (
                messages.map((message, index) => (
                  <div key={index} className={`alert alert-${message.type}`}>
                    {message.text}
                  </div>
                ))
              )}
              {children}
            </div>
            <div className="col-md-4" >
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
{/* 

{%load static%} 

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    /> 
    <link rel="stylesheet" type="text/css" href="{% static 'blog/main.css' %}"> 
    {% comment %} Generates absolute url of static files and accesses that blog main css {% endcomment %}
    {% if title %}
    <title>S&amp;N - {{title}}</title>
    {% else %}
    <title>Scents &amp; Notes</title>
    {% endif %}
  </head>
  <body>
    <header class="site-header">
      <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
        <div class="container">
          <a class="navbar-brand mr-4" href="/">Scents &amp; Notes</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggle"
            aria-controls="navbarToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarToggle">
            <div class="navbar-nav mr-auto">
              <a class="nav-item nav-link" href="/">Home</a>
              <a class="nav-item nav-link" href="/about">About</a>
            </div>
            <!-- Navbar Right Side -->
            <div class="navbar-nav"> 
              {% if user.is_authenticated %}   
                <a class="nav-item nav-link" href="{% url 'post-create' %}">New Post</a>
                <a class="nav-item nav-link" href="{% url 'profile' %}">Profile</a>
                <form method="post" action="{% url 'logout' %}">
                  {% csrf_token %}
                  <button class="btn btn-link nav-item nav-link" type="submit">Logout</button>
                </form>   
              {% else %} 
                <a class="nav-item nav-link" href="{% url 'login'%}">Login</a>
                <a class="nav-item nav-link" href="{% url 'register'%}">Register</a>
              {% endif%}
            </div>
          </div>
        </div>
      </nav>
    </header>

    {% comment %} Create a block is a section where child templates can override
    {% endcomment %}
    <main role="main" class="container">
        <div class="row">
          <div class="col-md-8">  
            {%if messages%}  
              {%for message in messages%}  
                <div class="alert alert-{{message.tags}}">
                  {{message}}
                </div>
              {%endfor%}
            {%endif%}
            {% block content %}{% endblock %}
          </div>
          <div class="col-md-4">
            <div class="content-section">
              <h3>Our Sidebar</h3>
              <p class='text-muted'>You can put any information here you'd like.
                <ul class="list-group">
                  <li class="list-group-item list-group-item-light">Latest Posts</li>
                  <li class="list-group-item list-group-item-light">Announcements</li>
                  <li class="list-group-item list-group-item-light">Calendars</li>
                  <li class="list-group-item list-group-item-light">etc</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
  </body>
</html> */}
