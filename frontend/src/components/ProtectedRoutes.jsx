

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin = false }) => {
  // Check the token from localStorage based on user type (admin or user)
  const token = isAdmin ? localStorage.getItem('adminToken') : localStorage.getItem('token');
  const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If trying to access admin dashboard but the user is not an admin, redirect to the user dashboard
  if (isAdmin && !userIsAdmin) {
    return <Navigate to="/user-dashboard" replace />;
  }

  // If trying to access user dashboard but the user is an admin, redirect to the admin dashboard
  if (!isAdmin && userIsAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Outlet />; // Render the child route if everything is fine
};

export default ProtectedRoute;
