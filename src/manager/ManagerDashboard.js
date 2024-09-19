import React, { useState, useEffect } from "react";
import { FaUserPlus, FaUsers, FaCalendarCheck, FaClipboardList, FaExclamationCircle, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";  // Import FaCalendarAlt here
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import AddUser from './AddUser';   // New component to add a user
import Users from './Users';       // New component to list users
import AttendanceReport from './AttendanceReport'; // New component for attendance report
import ShiftManagement from './ShiftManagement';   // New component for managing shifts
import LeaveApplications from './LeaveApplications'; // New component to view leave applications
import Issues from './Issues';  // New component to view and manage issues

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
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transform transition-transform duration-300 ease-in-out fixed lg:relative lg:translate-x-0 z-30 w-64 bg-gray-800 h-screen overflow-y-auto`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold text-xl">Manager Dashboard</span>
        </div>
        <nav className="mt-5">
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "addUser" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("addUser")}
          >
            <FaUserPlus className="mr-3" />
            Add User
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "users" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="mr-3" />
            Users
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "attendanceReport" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("attendanceReport")}
          >
            <FaCalendarCheck className="mr-3" />
            Attendance Report
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "shiftManagement" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("shiftManagement")}
          >
            <FaClipboardList className="mr-3" />
            Shift Management
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "leaveApplications" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("leaveApplications")}
          >
            <FaCalendarAlt className="mr-3" /> {/* Fixed missing icon */}
            Leave Applications
          </button>
          <button
            className={`flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left ${activeTab === "issues" ? "bg-gray-700 text-white" : ""
              }`}
            onClick={() => setActiveTab("issues")}
          >
            <FaExclamationCircle className="mr-3" />
            Issues
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
          {activeTab === "addUser" && <AddUser />}
          {activeTab === "users" && <Users />}
          {activeTab === "attendanceReport" && <AttendanceReport />}
          {activeTab === "shiftManagement" && <ShiftManagement />}
          {activeTab === "leaveApplications" && <LeaveApplications />}
          {activeTab === "issues" && <Issues />}
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;