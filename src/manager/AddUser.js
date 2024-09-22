import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Ensure correct Firebase setup
import { addDoc, collection } from "firebase/firestore";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // Role can be "Employee" or "Manager"
  const [employeeID, setEmployeeID] = useState("");
  const [gender, setGender] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add new user to Firebase Firestore
      await addDoc(collection(db, "Users"), {
        name,
        email,
        role,
        employeeID,
        gender,
        createdAt: new Date().toISOString(),
      });
      setSuccessMessage("User added successfully.");
      // Reset form fields
      setName("");
      setEmail("");
      setRole("");
      setEmployeeID("");
      setGender("");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Error adding user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter name"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            required
            placeholder="Enter employee ID"
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required className="border p-2 rounded w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required className="border p-2 rounded w-full">
            <option value="">Select role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add User
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default AddUser;
