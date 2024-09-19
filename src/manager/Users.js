import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, getDocs } from "firebase/firestore";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "Users"));
      setUsers(usersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded shadow">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;