import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import UserDashboard from '../src/pages/UserDashboard';
import AdminDashboard from '../src/pages/AdminDashboard';
import ProtectedRoute from '../src/components/ProtectedRoutes';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;