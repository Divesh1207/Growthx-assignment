

import React, { useState, useEffect } from 'react';
import { acceptAssignment, rejectAssignment, getAdminAssignments } from '../services/api';

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminAssignments();
  }, []);

  const fetchAdminAssignments = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        setError('Admin not authenticated');
        return;
      }

      const data = await getAdminAssignments(); 
      console.log('Fetched assignments:', data);
      setAssignments(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch assignments');
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptAssignment(id);
      fetchAdminAssignments();
    } catch (err) {
      setError('Failed to accept assignment');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAssignment(id);
      fetchAdminAssignments();
    } catch (err) {
      setError('Failed to reject assignment');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Format the date to a readable string
  };

  const hasUpdated = (createdAt, updatedAt) => {
    return createdAt !== updatedAt;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text mb-6">
        Admin Dashboard
      </h1>
      
      {error && <p className="text-red-500 mb-4 text-lg">{error}</p>}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Assignments to Review</h2>
        
        {assignments.length === 0 ? (
          <p className="text-lg text-gray-600">No assignments to review.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Task</th>
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Submitted By</th>
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Created At</th>
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Updated At</th>
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Status</th>
                  <th className="border p-4 text-left text-sm sm:text-base font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="border p-4 text-sm sm:text-base">{assignment.task}</td>
                    <td className="border p-4 text-sm sm:text-base">{assignment.userId.name}</td>
                    <td className="border p-4 text-sm sm:text-base">{formatDate(assignment.createdAt)}</td>
                    <td className="border p-4 text-sm sm:text-base">
                      <span className={hasUpdated(assignment.createdAt, assignment.updatedAt) ? 'text-blue-500 font-semibold' : ''}>
                        {formatDate(assignment.updatedAt)}
                      </span>
                      {hasUpdated(assignment.createdAt, assignment.updatedAt) && (
                        <span className="text-xs text-gray-500 ml-2">(Updated)</span>
                      )}
                    </td>
                    <td className="border p-4 text-sm sm:text-base">{assignment.status}</td>
                    <td className="border p-4 text-sm sm:text-base">
                      {assignment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAccept(assignment._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 mb-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(assignment._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mb-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

