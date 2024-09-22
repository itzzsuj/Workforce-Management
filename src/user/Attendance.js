import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase/firebase";
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const geofenceCenter = { 
  latitude: 12.921586,  // Updated company location
  longitude: 80.241123 
};
const geofenceRadius = 10; // 10 meter radius

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveDaysRemaining, setLeaveDaysRemaining] = useState(0);
  const [geoError, setGeoError] = useState(null);
  const [isInGeofence, setIsInGeofence] = useState(false);
  const [analytics, setAnalytics] = useState({ presentDays: 0, absentDays: 0 });

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Fetch attendance data from Firestore
      const userDocRef = doc(db, "Attendance", currentUser.uid);
      const unsub = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data().attendance || [];
          setAttendanceData(data);
          setLeaveDaysRemaining(doc.data().leaveDaysRemaining || 0);
          calculateAttendanceAnalytics(data);
        }
      });

      // Get user location for geofencing
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (isWithinGeofence(latitude, longitude)) {
              markAttendance(currentUser.uid, "In", new Date());
              setIsInGeofence(true);
            } else {
              setGeoError("You are not within the geofenced area to mark attendance.");
              setIsInGeofence(false);
            }
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setGeoError("Location access denied by the user. Please enable it to mark attendance.");
            } else {
              setGeoError("Geolocation error: " + error.message);
            }
          },
          {
            enableHighAccuracy: true,  // Use GPS if available
            timeout: 5000,             // Wait up to 5 seconds for a location
            maximumAge: 0              // Do not use cached position
          }
        );
      } else {
        setGeoError("Geolocation is not supported by this browser.");
      }

      return () => unsub();
    }
  }, []);

  // Function to check if the user is within the geofenced area
  const isWithinGeofence = (latitude, longitude) => {
    const distance = getDistanceFromLatLonInMeters(latitude, longitude, geofenceCenter.latitude, geofenceCenter.longitude);
    return distance <= geofenceRadius;
  };

  // Function to calculate distance between two lat/lon coordinates
  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Function to mark attendance in Firestore (In/Out)
  const markAttendance = async (userId, status, date) => {
    try {
      const userDocRef = doc(db, "Attendance", userId);
      const today = date.toISOString().split('T')[0];
      
      let updatedAttendance = attendanceData.map(record => 
        record.date === today ? { ...record, outTime: status === "Out" ? date.toISOString() : record.outTime } : record
      );
      
      if (!updatedAttendance.find(record => record.date === today)) {
        updatedAttendance.push({
          date: today,
          inTime: status === "In" ? date.toISOString() : null,
          outTime: status === "Out" ? date.toISOString() : null
        });
      }

      await setDoc(userDocRef, {
        attendance: updatedAttendance,
        leaveDaysRemaining
      }, { merge: true });

      console.log("Attendance marked successfully.");
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  // Function to calculate attendance percentage for the analytics
  const calculateAttendanceAnalytics = (attendanceData) => {
    const totalDays = attendanceData.length; // Number of days attendance is recorded
    const presentDays = attendanceData.filter(record => record.inTime).length; // Days with inTime (present)
    const absentDays = totalDays - presentDays; // Total days minus present days
    setAnalytics({ presentDays, absentDays });
  };

  const pieData = [
    { name: 'Present', value: analytics.presentDays },
    { name: 'Absent', value: analytics.absentDays }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div>
      <h1 className="text-2xl font-bold">Attendance</h1>
      {geoError && <p className="text-red-500">{geoError}</p>}
      {isInGeofence ? (
        <p className="text-green-500">You are within the geofenced area. Attendance marked!</p>
      ) : (
        <p className="text-yellow-500">You are not in the geofenced area.</p>
      )}
      <p>Leave Days Remaining: {leaveDaysRemaining}</p>
      {attendanceData.length ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inTime" stroke="#8884d8" />
              <Line type="monotone" dataKey="outTime" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>

          {/* Pie Chart for Attendance Analytics */}
          <h2 className="text-xl font-semibold mt-6">Attendance Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>Loading attendance data...</p>
      )}
    </div>
  );
};

export default Attendance;
