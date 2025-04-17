import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ViewBugs from "./ViewBugs"; // Import your ViewBugs component
import SubmitBug from "./SubmitBug"; // Import the SubmitBug component

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Bug Tracker</h1>
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/view-bugs">
          <button style={styles.button}>View Bugs</button>
        </Link>
        <Link to="/submit-bug">
          <button style={{ ...styles.button, marginLeft: "15px" }}>Submit Bug</button>
        </Link>
      </div>
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
