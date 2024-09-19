import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [resetEmail, setResetEmail] = useState("");

  // Function for password reset
  const handleForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email for password reset.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent.");
      setShowModal(false); // Close modal after successful send
    } catch (error) {
      alert(`Error sending password reset email: ${error.message}`);
    }
  };

  // Login or Register function based on isRegister state
  const signInOrRegister = async (e) => {
    e.preventDefault();

    if (!usertype || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (isRegister && usertype === "Manager") {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful");

        await addUserDataToFirestore(userCredential.user.uid, email, usertype);

        navigate("/ManagerDashboard"); // Redirect to manager dashboard after registration
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    } else if (!isRegister) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");

        // Fetch user data to verify the user type
        const q = query(
          collection(db, usertype === "Manager" ? "Managers" : "Employees"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("User does not exist");
        } else {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User data:", userData);
            localStorage.setItem("userType", usertype); 

            // Navigate based on the user type
            if (usertype === "Manager") {
              navigate("/ManagerDashboard"); // Navigate to Manager Dashboard
            } else if (usertype === "Employee") {
              navigate("/EmployeeDashboard"); // Navigate to Employee Dashboard
            }
          });
        }
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
    } else {
      alert("Only Managers can register.");
    }
  };

  const addUserDataToFirestore = async (uid, email, usertype) => {
    try {
      const userDocRef = collection(db, usertype === "Manager" ? "Managers" : "Employees");
      await addDoc(userDocRef, {
        uid: uid,
        email: email,
        userType: usertype,
      });
      console.log("User added to Firestore");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          {isRegister ? "Manager Registration" : "Login"}
        </h2>
        <p className="text-center text-gray-600">
          {isRegister ? "Create a new manager account" : "Sign in to your account"}
        </p>

        <form onSubmit={signInOrRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">User Type</label>
            <select
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={usertype}
              onChange={(e) => setUsertype(e.target.value)}
              required
            >
              <option value="">Select User Type</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {!isRegister && (
            <div className="text-right">
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setShowModal(true)} // Open modal when forgot password is clicked
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {isRegister ? "Register" : "Sign in"}
            </button>
          </div>
        </form>

        {usertype === "Manager" && (
          <div className="text-center mt-6">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        )}
      </div>

      {/* Modal for password reset */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h3>
            <p className="text-gray-600 mb-4">Enter your email to reset your password:</p>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleForgotPassword} // Send reset email
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;