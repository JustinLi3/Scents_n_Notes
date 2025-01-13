import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component/Blog/about"; 
import Home from "./component/Blog/home"
import Login from "./component/Users/login";
import Register from "./component/Users/register";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<TestPage />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />}/>


      </Routes>
    </Router>
  );
}

export default App;
