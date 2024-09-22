import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebase/firebase"; // Assuming you have your Firebase setup here
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // Holds user profile data
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = auth.currentUser; // Get the currently logged-in user
      if (currentUser) {
        try {
          // Reference to the Firestore document for this user
          const userDocRef = doc(db, "Employees", currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfileData(data); // Set profile data
          } else {
            setError('No such document!');
          }
        } catch (err) {
          setError('Error fetching data: ' + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user logged in.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      {profileData ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Role:</strong> {profileData.role}</p>
          <p><strong>Employee ID:</strong> {profileData.employeeId}</p>
          <p><strong>User Type:</strong> {profileData.userType}</p>
          <p><strong>Current Project:</strong> {profileData.currentProject}</p>

          {/* Display Experience as a list */}
          {profileData.experience && (
            <div>
              <h2 className="text-lg font-semibold">Experience (Years):</h2>
              <ul>
                {profileData.experience.map((year, index) => (
                  <li key={index}>{year} years</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Projects Worked On as a list */}
          {profileData.projectsWorkedOn && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Projects Worked On:</h2>
              <ul>
                {profileData.projectsWorkedOn.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Salary Hike as a list */}
          {profileData.salaryHike && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Salary Hike (in INR):</h2>
              <ul>
                {profileData.salaryHike.map((hike, index) => (
                  <li key={index}>₹{hike}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default Profile;
