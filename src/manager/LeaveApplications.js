import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const LeaveApplications = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsCollection = await getDocs(collection(db, "LeaveApplications"));
      setLeaveApplications(applicationsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    const leaveDocRef = doc(db, "LeaveApplications", id);
    await updateDoc(leaveDocRef, { status });
    alert(`Leave status updated to ${status}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leave Applications</h2>
      <ul className="space-y-4">
        {leaveApplications.map((application) => (
          <li key={application.id} className="bg-white p-4 rounded shadow">
            <p><strong>Type:</strong> {application.leaveType}</p>
            <p><strong>Dates:</strong> {application.startDate} to {application.endDate}</p>
            <p><strong>Reason:</strong> {application.reason}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <button
              onClick={() => handleStatusChange(application.id, "Approved")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(application.id, "Denied")}
              className="bg-red-500 text-white p-2 rounded ml-4"
            >
              Deny
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveApplications;