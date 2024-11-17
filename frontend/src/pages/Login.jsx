
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginAdmin } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Choose the login function based on isAdmin state
      const loginFunction = isAdmin ? loginAdmin : loginUser;
      const data = await loginFunction(email, password);
      
      // Log the response data for debugging
      console.log('Login Response Data:', data);
      
      // Check if data contains a valid token
      if (!data.token) {
        throw new Error('No token received');
      }
      if (isAdmin) {
        localStorage.setItem('adminToken', data.token); // Store admin token
        localStorage.setItem('isAdmin', 'true');  // Store admin flag
      } else {
        localStorage.setItem('token', data.token); // Store user token
      }
  
      // Set the token in localStorage
      if (isAdmin) {
        localStorage.setItem('adminToken', data.token);
      } else {
        localStorage.setItem('token', data.token);
      }

      // Store user type
      localStorage.setItem('userType', isAdmin ? 'admin' : 'user');

      // Log to check user type and navigate
      console.log('User Type:', isAdmin ? 'admin' : 'user');
      navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      console.error('Login Error:', err); // Log the full error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-600">Login as Admin</span>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
