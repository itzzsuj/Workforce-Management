import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaBell, FaExclamationCircle, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../firebase/firebase"; // Firebase setup
import { signOut } from "firebase/auth"; // Firebase Auth for sign out
import Attendance from './Attendance'; // Attendance component
import Profile from './Profile'; // Profile component
import LeaveApplication from './LeaveApplication'; // Leave Application component
import Notifications from './Notifications'; // Notifications component
import ReportProblem from './ReportProblem'; // Report a Problem component

const EmployeeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle
  const [user, setUser] = useState(null); // User state
  const [activeTab, setActiveTab] = useState("attendance"); // Active tab state

  // Fetch current user details from Firebase Auth
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/Login"; // Redirect to login page after signing out
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
          {/* Attendance Tab */}
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "attendance" ? "bg-gray-700 text-white" : ""}`}
            onClick={() => setActiveTab("attendance")}
          >
            <FaChartBar className="mr-3" />
            Attendance
          </button>

          {/* Profile Tab */}
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "profile" ? "bg-gray-700 text-white" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="mr-3" />
            Profile
          </button>

          {/* Leave Application Tab */}
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "leave" ? "bg-gray-700 text-white" : ""}`}
            onClick={() => setActiveTab("leave")}
          >
            <FaCalendarAlt className="mr-3" />
            Leave Application
          </button>

          {/* Notifications Tab */}
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "notifications" ? "bg-gray-700 text-white" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <FaBell className="mr-3" />
            Notifications
          </button>

          {/* Report a Problem Tab */}
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "report" ? "bg-gray-700 text-white" : ""}`}
            onClick={() => setActiveTab("report")}
          >
            <FaExclamationCircle className="mr-3" />
            Report a Problem
          </button>

          {/* Logout */}
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
                  src={user.photoURL || "https://via.placeholder.com/150"} // Default image if no photoURL
                  alt="User"
                />
                <span className="ml-2 font-medium text-gray-800">{user.displayName || user.email}</span>
              </>
            )}
          </div>
        </header>

        {/* Content based on active tab */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {activeTab === "attendance" && <Attendance />} {/* Attendance Component */}
          {activeTab === "profile" && <Profile />} {/* Profile Component */}
          {activeTab === "leave" && <LeaveApplication />} {/* Leave Application Component */}
          {activeTab === "notifications" && <Notifications />} {/* Notifications Component */}
          {activeTab === "report" && <ReportProblem />} {/* Report Problem Component */}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;