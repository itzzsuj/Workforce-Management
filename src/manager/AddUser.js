import React, { useState } from "react";
import { db, auth } from "../firebase/firebase"; // Firebase setup
import { addDoc, collection } from "firebase/firestore";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // Employee or Manager

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add new user to Firebase Firestore
      await addDoc(collection(db, "Users"), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });
      alert("User added successfully.");
      setName("");
      setEmail("");
      setRole("");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Error adding user.");
    }
  };

  return (
    <div>
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
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;