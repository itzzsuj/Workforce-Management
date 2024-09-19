import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const attendanceCollection = await getDocs(collection(db, "Attendance"));
      setAttendanceData(attendanceCollection.docs.map((doc) => ({ ...doc.data() })));
    };
    fetchAttendance();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Report</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="present" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceReport;