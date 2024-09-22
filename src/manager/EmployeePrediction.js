import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { db } from "../firebase/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const EmployeePrediction = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the TensorFlow model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelUrl = `${process.env.PUBLIC_URL}/Users/thirumalaivasan/Desktop/KCG/Workforce-Management/public/tfjs-model/Emodel.json`; // Correct path to your model
        const loadedModel = await tf.loadGraphModel(modelUrl);
        setModel(loadedModel);
        setLoading(false);
        console.log("Model loaded successfully.");
      } catch (error) {
        console.error("Error loading model:", error);
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleSearch = async () => {
    if (!employeeId) {
      alert("Please enter an Employee ID.");
      return;
    }

    // Query Firestore where the employeeId field matches
    const employeesRef = collection(db, "Employees");
    const q = query(employeesRef, where("employeeId", "==", employeeId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const employeeDoc = querySnapshot.docs[0]; // Get the first matching document
      setEmployeeData(employeeDoc.data()); // Set employee data
    } else {
      alert("Employee not found.");
    }
  };

  const handlePredict = async () => {
    if (!model || !employeeData) {
      alert("Model or employee data not available!");
      return;
    }

    // Ensure necessary fields for prediction
    if (!employeeData.attendanceDays || !employeeData.currentProjects || !employeeData.performanceScore) {
      alert("Employee data is incomplete for prediction.");
      return;
    }

    // Create the input tensor using employee's attendance, projects, and performance score
    const inputTensor = tf.tensor2d([
      [employeeData.attendanceDays, employeeData.currentProjects, employeeData.performanceScore]
    ]);

    try {
      // Perform the prediction
      const outputTensor = model.predict(inputTensor);
      const predictionArray = await outputTensor.array();
      setPrediction(predictionArray[0]); // Assuming single prediction output
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Prediction</h2>

      {/* Search for Employee */}
      <div className="mb-4">
        <label>Enter Employee ID: </label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
          Search
        </button>
      </div>

      {/* Show Employee Data */}
      {employeeData && (
        <div className="mb-4">
          <h3>Employee Details</h3>
          <p><strong>Name:</strong> {employeeData.name}</p>
          <p><strong>Current Project:</strong> {employeeData.currentProject}</p>
          <p><strong>Attendance Days:</strong> {employeeData.attendanceDays}</p>
          <p><strong>Current Projects:</strong> {employeeData.currentProjects}</p>
          <p><strong>Performance Score:</strong> {employeeData.performanceScore}</p>
        </div>
      )}

      {/* Prediction Button */}
      {employeeData && (
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Loading Model..." : "Predict Performance"}
        </button>
      )}

      {/* Prediction Results */}
      {prediction && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Predicted Performance for Next 3 Months:</h3>
          <pre className="bg-gray-200 p-2 rounded">
            {JSON.stringify(prediction, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default EmployeePrediction;
