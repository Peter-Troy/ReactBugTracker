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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Roboto', sans-serif",
  },
  headerContainer: {
    marginBottom: "40px",
  },
  header: {
    fontSize: "3rem",
    color: "#333",
    margin: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
