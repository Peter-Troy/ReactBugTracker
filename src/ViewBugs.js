import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewBugs() {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();
  const [editingBug, setEditingBug] = useState(null);

  

  // Function to navigate back to the main page
  const handleGoBack = () => {
    navigate("/"); // Navigate to the main page (root)

  };

  const handleEdit = (bug) => {
    setEditingBug({
      ...bug,
      createdAt: formatDate(bug.createdAt),
      finishedAt: formatDate(bug.finishedAt),
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0]; // returns YYYY-MM-DD
  };

  const handleUpdate = async () => {
    const updatedBug = {
      title: editingBug.title,
      description: editingBug.description,
      status: editingBug.status,
      assigned_to: editingBug.assigned_to,
      createdAt: editingBug.createdAt,
      finishedAt: editingBug.finishedAt,
      priority: editingBug.priority,
    
    };
  
    try {
      // Make the PUT request to update the bug
      await axios.put(`http://127.0.0.1:5000/bugs/${editingBug.id}`, updatedBug);
      console.log("Bug updated successfully");
  
      // Update the bugs state to reflect the changes
      setBugs((prevBugs) => {
        return prevBugs.map((bug) =>
          bug.id === editingBug.id ? { ...bug, ...updatedBug } : bug
        );
      });
  
      setEditingBug(null); // Close the form after successful update
    } catch (error) {
      console.error("Error updating bug:", error);
    }
  };

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/bugs");
        setBugs(response.data); // Update state with the fetched bugs
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };
  
    fetchBugs();
  }, [editingBug]); // This ensures the bugs are fetched again when editingBug changes
  
  

  // Fetch the bugs when the component mounts
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/bugs");
        setBugs(response.data);  // Update state with the fetched bugs
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };
    
    fetchBugs();
  }, []);  // Empty array ensures it only runs once when the page is loaded

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>View Bugs</h2>
      <button onClick={handleGoBack} style={styles.goBackButton}>Go Back to Main Page</button> {/* Go Back Button */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Bug ID</th>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Date Created</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Assigned To</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Priority</th>
            <th style={styles.tableHeader}>Date Solved</th>
           
            
          </tr>
        </thead>
        <tbody>
          {bugs.length > 0 ? (
            bugs.map((bug, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{bug.id}</td>
                <td style={styles.tableCell}>{bug.title}</td>
                <td style={styles.tableCell}>{formatDisplayDate(bug.createdAt)}</td>
                <td style={styles.tableCell}>{bug.description}</td>
                <td style={styles.tableCell}>{bug.assigned_to}</td>
                <td style={styles.tableCell}>{bug.status}</td>
                <td style={styles.tableCell}>{bug.priority}</td>
                <td style={styles.tableCell}>{formatDisplayDate(bug.finishedAt)}</td>
                <td style={styles.tableCell}>
                <button 
                  onClick={() => handleEdit(bug)} 
                  style={styles.editButton}>
                  Edit
                </button>
              </td>
                    </tr>
                  ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.tableCell}>No bugs available</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingBug && (
  <div style={styles.editFormContainer}>
    <h3>Edit Bug</h3>

    {/* Title Field */}
    <th style={styles.tableHeader}>Title</th>
    <input
      type="text"
      value={editingBug.title}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, title: e.target.value }))}
      style={styles.input}
    />

    {/* Created At Field */}
    <th style={styles.tableHeader}>Date Created</th>
    <input
      type="date"
      value={editingBug.createdAt}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, createdAt: e.target.value }))}
      style={styles.input}
    />

    {/* Description Field */}
    <th style={styles.tableHeader}>Description</th>
    <input
      type="text"
      value={editingBug.description}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, description: e.target.value }))}
      style={styles.input}
    />

    {/* Assigned To Field */}
    <th style={styles.tableHeader}>Assigned to</th>
    <input
      type="text"
      value={editingBug.assigned_to}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, assigned_to: e.target.value }))}
      style={styles.input}
    />

    {/* Status Dropdown */}
    <th style={styles.tableHeader}>Status</th>
    <select
      value={editingBug.status}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, status: e.target.value }))}
      style={styles.input}
    >
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Resolved">Resolved</option>
      <option value="Closed">Closed</option>
    </select>

    {/* Priority Field */}
    <th style={styles.tableHeader}>Priority</th>
    <select
      value={editingBug.priority}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, priority: e.target.value }))}
      style={styles.input}
    >
      <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
      </select>

    {/* Created At Field */}
    <th style={styles.tableHeader}>Date Solved</th>
    <input
      type="date"
      value={editingBug.finishedAt}
      onChange={(e) => setEditingBug(prevState => ({ ...prevState, finishedAt: e.target.value }))}
      style={styles.input}
    />

    <button onClick={handleUpdate} style={styles.submitButton}>Update Bug</button>
    <button onClick={() => setEditingBug(null)} style={styles.cancelButton}>Cancel</button>
  </div>
)}


    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px 15px",
    textAlign: "left",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    fontSize: "1rem",
  },
  tableCell: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontSize: "1rem",
  },
  editButton: {
    backgroundColor: "#f39c12",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  editFormContainer: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    margin: "30px auto",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "15px",
    width: "100%",
    fontSize: "1rem",
  },
  submitButton: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "12px 25px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  tableActionCell: {
    textAlign: "center",
  },
};



export default ViewBugs;
