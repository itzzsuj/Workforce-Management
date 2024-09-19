// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Add Firebase Storage
 
const firebaseConfig = {
  apiKey: "AIzaSyD6QSIJmQrMj2v1mu0N8FdYbRQttx3vgTo",
  authDomain: "att-login-auth.firebaseapp.com",
  projectId: "att-login-auth",
  storageBucket: "att-login-auth.appspot.com",
  messagingSenderId: "834030621075",
  appId: "1:834030621075:web:cdecb4e2fe3636ec59d866"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Firebase Storage  <-- Add this for media uploads

// Fetch current location (latitude, longitude) from Firestore
export async function fetchUserLocation(userId) {
  try {
    const docRef = doc(db, "locations", userId);  // Get a reference to the document
    const docSnap = await getDoc(docRef);  // Fetch the document

    if (docSnap.exists()) {
      const data = docSnap.data();
      const { latitude, longitude } = data;
      console.log(`Current Location: Lat: ${latitude}, Lng: ${longitude}`);
      return { latitude, longitude };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location: ", error);
    throw error;  // Optionally rethrow the error to handle it later
  }
}

// Example call to the function with the userId
fetchUserLocation("USER_ID").then(location => {
  if (location) {
    console.log("Location fetched:", location);
  }
}).catch(error => {
  console.error("Error during location fetch:", error);
});

export default app;
