import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceMatrix = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [showModal, setShowModal] = useState(false); // Modal state
  const [showCount, setShowCount] = useState(5);

  // Fetch employee data from Firebase
  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeCollection = await getDocs(collection(db, "Employees"));
      setEmployees(employeeCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchEmployees();
  }, []);

  // Fetch the selected employee's details (experience, projects, salary hike, etc.)
  const fetchEmployeeDetails = async (id) => {
    const employeeDocRef = doc(db, "Employees", id);
    const employeeDoc = await getDoc(employeeDocRef);
    if (employeeDoc.exists()) {
      let employeeData = employeeDoc.data();
      
      // Parse 'projectsWorkedOn' if it's stored as a string
      if (typeof employeeData.projectsWorkedOn === 'string') {
        try {
          employeeData.projectsWorkedOn = JSON.parse(employeeData.projectsWorkedOn);
        } catch (error) {
          console.error('Failed to parse projectsWorkedOn:', error);
          employeeData.projectsWorkedOn = []; // Fallback to empty array
        }
      }

      // Parse 'experience' and 'salaryHike' if they are stored as strings
      if (typeof employeeData.experience === 'string') {
        employeeData.experience = JSON.parse(employeeData.experience);
      }
      if (typeof employeeData.salaryHike === 'string') {
        employeeData.salaryHike = JSON.parse(employeeData.salaryHike);
      }

      setEmployeeDetails(employeeData); // Store all employee data in state
      setShowModal(true); // Show the modal
    } else {
      setEmployeeDetails(null);
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    fetchEmployeeDetails(employee.id); // Fetch experience and other details
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null); // Clear the selected employee
  };

  // Data for the experience chart
  const experienceData = {
    labels: ["2019", "2020", "2021", "2022", "2023"], // Example years
    datasets: [
      {
        label: "Experience (Years)",
        data: employeeDetails.experience || [0, 0, 0, 0, 0], // Display the fetched experience data
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for the salary hike chart
  const salaryHikeData = {
    labels: ["2019", "2020", "2021", "2022", "2023"], // Example years
    datasets: [
      {
        label: "Salary Hike ($)",
        data: employeeDetails.salaryHike || [0, 0, 0, 0, 0], // Display the salary hike data
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Performance Matrix</h2>
      <ol className="list-decimal space-y-4">
        {employees.slice(0, showCount).map((employee, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => handleEmployeeClick(employee)}
          >
            <div className="font-bold">{employee.name}</div>
            <div>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Employee ID:</strong> {employee.employeeId}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Button to show more employees */}
      {showCount < employees.length && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowCount(showCount + 5)}
        >
          Show More
        </button>
      )}

      {/* Modal Popup */}
      {showModal && selectedEmployee && employeeDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-4xl h-4/5 overflow-auto p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Details for {selectedEmployee.name}</h3>

            {/* Experience Chart */}
            <h4 className="text-lg font-semibold mb-2">Experience Over the Years</h4>
            <Bar data={experienceData} options={options} />

            {/* Salary Hike Chart */}
            <h4 className="text-lg font-semibold mt-6 mb-2">Salary Hike Over the Years</h4>
            <Bar data={salaryHikeData} options={options} />

            {/* Projects Worked On */}
            <h4 className="text-lg font-semibold mt-6 mb-2">Projects Worked On</h4>
            <ul className="list-disc pl-5">
              {employeeDetails.projectsWorkedOn && employeeDetails.projectsWorkedOn.length > 0 ? (
                employeeDetails.projectsWorkedOn.map((project, index) => (
                  <li key={index}>{project}</li>
                ))
              ) : (
                <li>No projects listed</li>
              )}
            </ul>

            {/* Current Project */}
            <h4 className="text-lg font-semibold mt-6 mb-2">Current Project</h4>
            <p>{employeeDetails.currentProject || "No current project assigned"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMatrix;
