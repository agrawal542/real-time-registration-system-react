import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logout successful!');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Real-time Registration System</div>
        <div>
          {isAuthenticated ? (
            <>
              <Link
                to="/sessions"
                className="text-white px-4 py-2 hover:bg-blue-600 rounded"
              >
                Session Details
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 hover:bg-blue-600 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
               <Link
                to="/register"
                className="text-white px-4 py-2 hover:bg-blue-600 rounded"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white px-4 py-2 hover:bg-blue-600 rounded"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
