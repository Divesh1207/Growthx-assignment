import { useState, useEffect } from 'react';
import { getAdmins, submitAssignment } from '../services/api';

function AssignmentForm({ onAssignmentSubmitted }) {
  const [task, setTask] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (err) {
      setError('Failed to fetch admins');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await submitAssignment(task, selectedAdmin);
      setTask('');
      setSelectedAdmin('');
      if (onAssignmentSubmitted) {
        onAssignmentSubmitted();
      }
    } catch (err) {
      setError('Failed to submit assignment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Submit New Assignment</h3>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="task" className="block mb-1">Task</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="admin" className="block mb-1">Assign to Admin</label>
        <select
          id="admin"
          value={selectedAdmin}
          onChange={(e) => setSelectedAdmin(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select an admin</option>
          {admins.map((admin) => (
            <option key={admin._id} value={admin._id}>{admin.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Assignment
      </button>
    </form>
  );
}

export default AssignmentForm;