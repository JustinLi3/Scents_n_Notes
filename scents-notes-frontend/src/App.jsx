import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./component/Blog/TestPage";
import About from "./component/Blog/about"; 
import Home from "./component/Blog/home"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<TestPage />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/" element={<TestPage />}/>
        <Route path="/home" element={<Home />}/>


      </Routes>
    </Router>
  );
}

export default App;
