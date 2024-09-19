// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "Employees", currentUser.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      {profileData ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Job Role:</strong> {profileData.role}</p>
          <p><strong>Employee ID:</strong> {profileData.employeeId}</p>
          {/* Add more profile fields as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;