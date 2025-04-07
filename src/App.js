import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ViewBugs from "./ViewBugs"; // Import your ViewBugs component
import SubmitBug from "./SubmitBug"; // Import the SubmitBug component

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bug Tracker</h1>
      <Link to="/view-bugs"><button>View Bugs</button></Link>
      <Link to="/submit-bug"><button style={{ marginLeft: "10px" }}>Submit Bug</button></Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-bugs" element={<ViewBugs />} />
        <Route path="/submit-bug" element={<SubmitBug />} />
      </Routes>
    </Router>
  );
}

export default App;
