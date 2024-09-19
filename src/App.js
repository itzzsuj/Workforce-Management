import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDashboard from './components/EmployeeDashboard';  // Employee dashboard
import ManagerDashboard from "./manager/ManagerDashboard";
function App() {
  return (
    <Router>
      <div>
        {/* Define routes for navigation */}
        <Routes>
          {/* Employee Dashboard Route */}
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/ManagerDasboard" element={<ManagerDashboard/>}/>

          {/* Default route (redirects to EmployeeDashboard) */}
          <Route path="/" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
