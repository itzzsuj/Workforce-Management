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
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);
    } catch (error) {
      alert(`Error sending password reset email: ${error.message}`);
    }
  };

  // Helper functions
  const generateEmployeeId = () => {
    return `EMP${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const generateNameFromEmail = (email) => {
    return email.split('@')[0];  // Use first part of email as name
  };

  const generateGender = (name) => {
    const maleNames = ["John", "Michael", "David"];
    const femaleNames = ["Sarah", "Emma", "Jessica"];

    if (maleNames.includes(name)) {
      return "Male";
    } else if (femaleNames.includes(name)) {
      return "Female";
    } else {
      return "Other";
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

        const employeeId = generateEmployeeId();
        const name = generateNameFromEmail(email);
        const gender = generateGender(name);

        await addUserDataToFirestore(userCredential.user.uid, email, employeeId, name, gender, usertype);
        navigate("/ManagerDashboard");
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    } else if (!isRegister) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");

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
            localStorage.setItem("userType", usertype);
            localStorage.setItem("employeeName", userData.name);
            localStorage.setItem("employeeEmail", email);
            localStorage.setItem("employeeId", userData.employeeId);
            localStorage.setItem("gender", userData.gender);

            if (usertype === "Manager") {
              navigate("/ManagerDashboard");
            } else if (usertype === "Employee") {
              navigate("/EmployeeDashboard");
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

  const addUserDataToFirestore = async (uid, email, employeeId, name, gender, usertype) => {
    try {
      const userDocRef = collection(db, usertype === "Manager" ? "Managers" : "Employees");
      await addDoc(userDocRef, {
        uid: uid,
        email: email,
        employeeId: employeeId,
        name: name,
        gender: gender,
        userType: usertype,
      });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          {isRegister ? "Register as Manager" : "Sign In"}
        </h2>
        <form onSubmit={signInOrRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="text-blue-600 hover:underline text-sm"
                onClick={() => setShowModal(true)}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isRegister ? "Register" : "Sign In"}
            </button>
          </div>
        </form>

        {usertype === "Manager" && (
          <div className="text-center mt-4">
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
            </button>
          </div>
        )}
      </div>

      {/* Modal for password reset */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Reset Password</h3>
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
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleForgotPassword}
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
