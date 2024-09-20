import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const PerformanceMatrix = () => {
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const performanceCollection = await getDocs(collection(db, "PerformanceMatrix"));
      setPerformances(performanceCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPerformanceData();
  }, []);

  const handlePerformanceUpdate = async (id, status) => {
    const performanceDocRef = doc(db, "PerformanceMatrix", id);
    await updateDoc(performanceDocRef, { status });
    alert(`Performance status updated to ${status}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Performance Matrix</h2>
      <ul className="space-y-4">
        {performances.map((performance) => (
          <li key={performance.id} className="bg-white p-4 rounded shadow">
            <p><strong>Employee:</strong> {performance.employeeName}</p>
            <p><strong>Project:</strong> {performance.projectName}</p>
            <p><strong>Completion Rate:</strong> {performance.completionRate}%</p>
            <p><strong>Status:</strong> {performance.status}</p>
            <button
              onClick={() => handlePerformanceUpdate(performance.id, "Completed")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => handlePerformanceUpdate(performance.id, "In Progress")}
              className="bg-yellow-500 text-white p-2 rounded ml-4"
            >
              Mark as In Progress
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceMatrix;
