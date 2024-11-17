
import { useState, useEffect } from 'react';
import { getUserAssignments } from '../services/api';
import AssignmentForm from '../components/AssignmentForm';
import { FaTasks, FaUserAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
function UserDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserAssignments();
  }, []);

  const fetchUserAssignments = async () => {
    try {
      const data = await getUserAssignments();
      console.log('data of user assignment in user dashboard',data);
      setAssignments(data);
    } catch (err) {
      setError('Failed to fetch assignments');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">User Dashboard</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Assignment Submission Form */}
        <AssignmentForm onAssignmentSubmitted={fetchUserAssignments} />

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Assignments</h3>

          {assignments.length === 0 ? (
            <p className="text-gray-500">No assignments submitted yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
                <div key={assignment._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                  <div className="flex items-center space-x-3 mb-4">
                    <FaTasks className="text-indigo-600 text-3xl" />
                    <h4 className="text-xl font-semibold text-gray-800">{assignment.task}</h4>
                  </div>
                  <div className="text-gray-600">
                    <p><strong>Assigned To:</strong> {assignment.admin.name}</p>
                    <p><strong>Status:</strong> 
                      {assignment.status === 'accepted' ? (
                        <span className="text-green-500 flex items-center">
                          <FaCheckCircle className="mr-2" /> {assignment.status}
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <FaTimesCircle className="mr-2" /> {assignment.status}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;