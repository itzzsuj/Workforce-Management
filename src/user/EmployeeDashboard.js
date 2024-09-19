// src/components/EmployeeDashboard.js
import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaBell, FaExclamationCircle, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import Attendance from './Attendance';
import Profile from './Profile';
import LeaveApplication from './LeaveApplication';
import Notifications from './Notifications';
import ReportProblem from './ReportProblem';

const EmployeeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("attendance");

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
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transform transition-transform duration-300 ease-in-out fixed lg:relative lg:translate-x-0 z-30 w-64 bg-gray-800 h-screen overflow-y-auto`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold text-xl">Employee Dashboard</span>
        </div>
        <nav className="mt-5">
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "attendance" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("attendance")}
          >
            <FaChartBar className="mr-3" />
            Attendance
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "profile" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="mr-3" />
            Profile
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "leave" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("leave")}
          >
            <FaCalendarAlt className="mr-3" />
            Leave Application
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "notifications" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("notifications")}
          >
            <FaBell className="mr-3" />
            Notifications
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "report" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("report")}
          >
            <FaExclamationCircle className="mr-3" />
            Report a Problem
          </button>
          <button
            className="flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left mt-auto"
            onClick={handleSignOut}
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <button
            className="text-gray-500 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 6H20M4 12H20M4 18H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex items-center">
            {user && (
              <>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="User"
                />
                <span className="ml-2 font-medium text-gray-800">{user.displayName || user.email}</span>
              </>
            )}
          </div>
        </header>

        {/* Content based on active tab */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {activeTab === "attendance" && <Attendance />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "leave" && <LeaveApplication />}
          {activeTab === "notifications" && <Notifications />}
          {activeTab === "report" && <ReportProblem />}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;