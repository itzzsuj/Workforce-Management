import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { addDoc, collection } from "firebase/firestore";

const ShiftManagement = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [shift, setShift] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add shift to Firebase Firestore
      await addDoc(collection(db, "Shifts"), {
        employeeId,
        shift,
        assignedAt: new Date().toISOString(),
      });
      alert("Shift assigned successfully.");
      setEmployeeId("");
      setShift("");
    } catch (error) {
      console.error("Error assigning shift: ", error);
      alert("Error assigning shift.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shift Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            placeholder="Enter employee ID"
          />
        </div>
        <div>
          <label>Shift:</label>
          <input
            type="text"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
            placeholder="Enter shift (e.g., 9AM-5PM)"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Assign Shift</button>
      </form>
    </div>
  );
};

export default ShiftManagement;