import React, { useState } from "react";
import { db, auth } from "../firebase/firebase"; // Import Firestore and Auth setup
import { addDoc, collection } from "firebase/firestore";

const ReportProblem = () => {
  const [problemType, setProblemType] = useState("");
  const [description, setDescription] = useState("");
  const [status] = useState("Pending"); // Default status to "Pending"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!problemType || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Add problem report to Firestore
        await addDoc(collection(db, "Problems"), {
          uid: currentUser.uid,
          problemType,
          description,
          status,
          submittedAt: new Date().toISOString(),
        });

        alert("Problem reported successfully.");
        setProblemType("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error reporting problem: ", error);
      alert("Failed to report problem.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">Report a Problem</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Problem Type</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={problemType}
              onChange={(e) => setProblemType(e.target.value)}
              required
            >
              <option value="">Select problem type</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="HR Issue">HR Issue</option>
              <option value="Facility Issue">Facility Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the problem in detail"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReportProblem;