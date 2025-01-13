import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component/Blog/about"; 
import Home from "./component/Blog/home";
import Login from "./component/Users/login"; 
import Profile from "./component/Users/profile";
import Register from "./component/Users/register";
import AuthProvider from "./component/AuthContext";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire Router in the AuthProvider */}
      <Router>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
