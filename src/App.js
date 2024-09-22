import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase"; // Firebase Authentication setup
import EmployeeDashboard from './components/EmployeeDashboard';  // Employee Dashboard
import ManagerDashboard from "./manager/ManagerDashboard"; // Manager Dashboard
import Login from './components/Login'; // Login Component (assumed to exist)
import LoadingScreen from './components/LoadingScreen'; // Loading Screen during Auth check (optional)

function App() {
  const [user, setUser] = useState(null); // Firebase Authenticated User
  const [loading, setLoading] = useState(true); // Loading state while checking authentication
  const [userRole, setUserRole] = useState(""); // Role of the user (Employee or Manager)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Assume you fetch user role from Firestore (not included in this code)
        // Example function that fetches user role:
        const role = await fetchUserRole(currentUser.uid); // Implement this function
        setUserRole(role);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to fetch user role from Firestore (Assumed to exist)
  const fetchUserRole = async (userId) => {
    // Add logic to fetch the role of the user from Firestore based on UID
    // Example: Firestore query to get user role
    // Return "Employee" or "Manager" based on the role from Firestore
  };

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Route for Login */}
          <Route path="/Login" element={<Login />} />

          {/* Employee Dashboard Route */}
          {user && userRole === "Employee" && (
            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          )}

          {/* Manager Dashboard Route */}
          {user && userRole === "Manager" && (
            <Route path="/ManagerDashboard" element={<ManagerDashboard />} />
          )}

          {/* Default Route: Redirect to respective dashboard based on role */}
          {user ? (
            <Route
              path="/"
              element={
                userRole === "Employee" ? (
                  <Navigate to="/EmployeeDashboard" />
                ) : (
                  <Navigate to="/ManagerDashboard" />
                )
              }
            />
          ) : (
            // Redirect to Login if no user is logged in
            <Route path="/" element={<Navigate to="/Login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
