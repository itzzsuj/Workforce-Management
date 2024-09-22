import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUsers, FaCalendarCheck, FaClipboardList, FaExclamationCircle, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import AddUser from './AddUser';
import Users from './Users';
import AttendanceReport from './AttendanceReport';
import ShiftManagement from './ShiftManagement';
import LeaveApplications from './LeaveApplications';
import Issues from './Issues';
import PerformanceMatrix from './PerformanceMatrix';
import EmployeePrediction from './EmployeePrediction';  // New component for employee prediction

const ManagerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("addUser");

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/Login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transform transition-transform duration-300 ease-in-out fixed lg:relative lg:translate-x-0 z-30 w-64 bg-gray-800 h-screen overflow-y-auto`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold text-xl">Manager Dashboard</span>
        </div>
        <nav className="mt-5">
          <button className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "addUser" ? "bg-gray-700 text-white" : ""}`} onClick={() => setActiveTab("addUser")}>
            <FaUserPlus className="mr-3" /> Add User
          </button>
          <button className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "users" ? "bg-gray-700 text-white" : ""}`} onClick={() => setActiveTab("users")}>
            <FaUsers className="mr-3" /> Users
          </button>
          <button className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "attendanceReport" ? "bg-gray-700 text-white" : ""}`} onClick={() => setActiveTab("attendanceReport")}>
            <FaCalendarCheck className="mr-3" /> Attendance Report
          </button>
          <button className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "shiftManagement" ? "bg-gray-700 text-white" : ""}`} onClick={() => setActiveTab("shiftManagement")}>
            <FaClipboardList className="mr-3" /> Shift Management
          </button>
          <button className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "employeePrediction" ? "bg-gray-700 text-white" : ""}`} onClick={() => setActiveTab("employeePrediction")}>
            <FaCalendarAlt className="mr-3" /> Employee Prediction
          </button>
          <button className="flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left mt-auto" onClick={handleSignOut}>
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {activeTab === "addUser" && <AddUser />}
          {activeTab === "users" && <Users />}
          {activeTab === "attendanceReport" && <AttendanceReport />}
          {activeTab === "shiftManagement" && <ShiftManagement />}
          {activeTab === "employeePrediction" && <EmployeePrediction />} {/* New tab for EmployeePrediction */}
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
