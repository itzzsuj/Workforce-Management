// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const notificationsRef = collection(db, 'Notifications');
      const q = query(notificationsRef, where('uid', '==', currentUser.uid));

      const unsub = onSnapshot(q, (snapshot) => {
        const notes = [];
        snapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() });
        });
        setNotifications(notes);
      });

      return () => unsub();
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Notifications</h1>
      <ul className="mt-4 space-y-2">
        {notifications.length ? (
          notifications.map((note) => (
            <li key={note.id} className="bg-white shadow p-4 rounded">
              {note.message}
            </li>
          ))
        ) : (
          <li>No notifications found</li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;