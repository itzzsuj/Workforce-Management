import React, { useState } from "react";
import { db, auth } from "../firebase/firebase"; // Import Firestore and Auth setup
import { addDoc, collection } from "firebase/firestore";

const LeaveApplication = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status] = useState("Pending"); // Default status to "Pending"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !startDate || !endDate || !reason) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Add leave application to Firestore
        await addDoc(collection(db, "LeaveApplications"), {
          uid: currentUser.uid,
          leaveType,
          startDate,
          endDate,
          reason,
          status,
          submittedAt: new Date().toISOString(),
        });

        alert("Leave application submitted successfully.");
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
      }
    } catch (error) {
      console.error("Error submitting leave application: ", error);
      alert("Failed to submit leave application.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">Leave Application</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Leave Type</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select leave type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Reason</label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Reason for leave"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LeaveApplication;