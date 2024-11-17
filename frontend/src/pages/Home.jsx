
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center overflow-x-hidden">
      <div className="text-center w-full max-w-lg sm:max-w-3xl px-6 py-12 bg-white rounded-lg shadow-lg mx-4 sm:mx-0">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Assignment Portal
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Manage your assignments with ease and stay organized.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 sm:space-x-8">
          <Link 
            to="/login" 
            className="bg-blue-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:bg-blue-600 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-green-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:bg-green-600 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
