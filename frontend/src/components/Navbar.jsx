


import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaSignInAlt, FaSignOutAlt, FaRegUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  
  // Check if the user is logged in (both admin and regular user)
  const isLoggedIn = localStorage.getItem('token') || localStorage.getItem('adminToken');
  
  // Check if the user is an admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  const handleLogout = () => {
    // Remove the correct token and admin status
    localStorage.removeItem(isAdmin ? 'adminToken' : 'token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <FaUserAlt className="text-white" />
          <span>Assignment Portal</span>
        </Link>

        {/* Navbar Links and Actions */}
        <div className="hidden sm:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Show Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center space-x-1"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Show Login and Register Links */}
              <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
                <FaSignInAlt />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center space-x-1"
              >
                <FaRegUser />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Show Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center space-x-1"
              >
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <>
              {/* Show Login and Register Links */}
              <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
                <FaSignInAlt />
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center space-x-1"
              >
                <FaRegUser />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

