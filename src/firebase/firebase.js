// Import the necessary Firebase SDKs
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Firebase Storage functions

// Your Firebase Configuration object (replace with your own config)
const firebaseConfig = {
  //write youre own api key 
};

// Check if Firebase app is already initialized to prevent duplicate initialization
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);  // Initialize Firebase if no apps have been initialized
} else {
  app = getApps()[0];  // Use the already initialized app
}

// Export Firebase services to be used across the app
export const auth = getAuth(app);          // Firebase Authentication
export const db = getFirestore(app);       // Firestore Database
export const storage = getStorage(app);    // Firebase Storage

// Function to download the TensorFlow model from Firebase Storage
export async function fetchModelFromStorage() {
  const modelRef = ref(storage, "tfjs-model/model.json"); // Path to your model.json file in Storage

  try {
    const modelURL = await getDownloadURL(modelRef); // Get the URL to download the model
    console.log("Model URL: ", modelURL);
    return modelURL; // You can use this URL to load the model in TensorFlow.js
  } catch (error) {
    console.error("Error fetching model from Firebase Storage:", error);
    throw error;
  }
}

// Function to fetch user location (latitude, longitude) from Firestore
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
    throw error;
  }
}

export default app;
