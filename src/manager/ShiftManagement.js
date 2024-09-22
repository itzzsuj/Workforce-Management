import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Assuming you have Firebase set up
import { collection, query, where, getDocs } from "firebase/firestore";

const ShiftManagement = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [days, setDays] = useState("");
  const [url, setUrl] = useState("");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employees whose current project is 'nil'
    const fetchAvailableEmployees = async () => {
      try {
        const employeesQuery = query(
          collection(db, "Employees"),
          where("currentProject", "==", "nil")
        );
        const querySnapshot = await getDocs(employeesQuery);
        const employees = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAvailableEmployees(employees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchAvailableEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the Streamlit URL with query parameters
    const streamlitUrl = `http://localhost:8501/?project_name=${encodeURIComponent(
      projectName
    )}&project_description=${encodeURIComponent(
      projectDescription
    )}&project_size=${encodeURIComponent(projectSize)}&days=${encodeURIComponent(
      days
    )}`;

    // Set the URL to display the Streamlit app in the iframe
    setUrl(streamlitUrl);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shift Management</h2>

      {/* Display Available Employees */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Available Employees</h3>
        {loading ? (
          <p>Loading available employees...</p>
        ) : availableEmployees.length > 0 ? (
          <ul className="list-disc pl-5">
            {availableEmployees.map((employee) => (
              <li key={employee.id}>
                <strong>ID:</strong> {employee.employeeId} | <strong>Name:</strong> {employee.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No available employees at the moment.</p>
        )}
      </div>

      {/* Display the form after listing employees */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            placeholder="Enter project name"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Project Description:</label>
          <input
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            placeholder="Enter project description"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Project Size:</label>
          <select
            value={projectSize}
            onChange={(e) => setProjectSize(e.target.value)}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select project size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div>
          <label>No. of Days:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            placeholder="Enter number of days"
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      {/* Streamlit Output */}
      {url && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Streamlit App Output:</h3>
          <iframe
            src={url}
            style={{ width: "100%", height: "600px", border: "none" }}
            title="Streamlit App"
          />
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;
