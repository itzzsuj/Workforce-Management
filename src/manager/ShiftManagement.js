import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { fetchModelFromStorage } from '../firebase/firebase'; // Assuming you already have this function to fetch the model URL

const ShiftManagement = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSize, setProjectSize] = useState(""); // "Small", "Medium", "Large"
  const [days, setDays] = useState("");
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the TensorFlow.js model from Firebase Storage
  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelUrl = await fetchModelFromStorage(); // Fetch the model URL from Firebase Storage
        const loadedModel = await tf.loadGraphModel(modelUrl); // Load the model using TensorFlow.js
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!model) {
      alert("Model is not loaded yet.");
      return;
    }

    if (!projectName || !projectDescription || !projectSize || !days) {
      alert("Please fill all fields.");
      return;
    }

    // Map project size to numerical value
    let sizeValue;
    if (projectSize === "Small") {
      sizeValue = 1;
    } else if (projectSize === "Medium") {
      sizeValue = 2;
    } else if (projectSize === "Large") {
      sizeValue = 3;
    } else {
      alert("Invalid project size selected.");
      return;
    }

    try {
      // Create input tensor based on project size and number of days
      const inputTensor = tf.tensor2d([
        [sizeValue, parseFloat(days)], // Map "Small", "Medium", "Large" to numerical values
      ]);

      // Perform prediction asynchronously
      const output = model.predict(inputTensor);
      const predictionArray = await output.array(); // Get the prediction as an array
      setPrediction(predictionArray); // Set the prediction in state
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error predicting shift allocation.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shift Management</h2>
      {loading ? (
        <p>Loading model...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Loading model..." : "Submit"}
          </button>
        </form>
      )}

      {prediction && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Shift Prediction:</h3>
          <pre className="bg-gray-200 p-2 rounded">
            {JSON.stringify(prediction, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ShiftManagement;