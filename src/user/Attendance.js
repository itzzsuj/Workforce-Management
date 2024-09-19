// src/components/Attendance.js
import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase/firebase";
import { doc, onSnapshot } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [leaveDaysRemaining, setLeaveDaysRemaining] = useState(0);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userDocRef = doc(db, "Attendance", currentUser.uid);
      const unsub = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setAttendanceData(doc.data().attendance); // Assume attendance is stored under 'attendance'
          setLeaveDaysRemaining(doc.data().leaveDaysRemaining || 0); // Remaining leave days
        }
      });

      return () => unsub();
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Attendance</h1>
      <p>Leave Days Remaining: {leaveDaysRemaining}</p>
      {attendanceData ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="status" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading attendance data...</p>
      )}
    </div>
  );
};

export default Attendance;