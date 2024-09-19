import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Issues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const issuesCollection = await getDocs(collection(db, "Issues"));
      setIssues(issuesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchIssues();
  }, []);

  const handleIssueUpdate = async (id, status) => {
    const issueDocRef = doc(db, "Issues", id);
    await updateDoc(issueDocRef, { status });
    alert(`Issue marked as ${status}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reported Issues</h2>
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li key={issue.id} className="bg-white p-4 rounded shadow">
            <p><strong>Type:</strong> {issue.problemType}</p>
            <p><strong>Description:</strong> {issue.description}</p>
            <p><strong>Status:</strong> {issue.status}</p>
            <button
              onClick={() => handleIssueUpdate(issue.id, "Resolved")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Mark as Resolved
            </button>
            <button
              onClick={() => handleIssueUpdate(issue.id, "In Progress")}
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

export default Issues;