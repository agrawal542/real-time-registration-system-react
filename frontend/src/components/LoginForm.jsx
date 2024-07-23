import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const socket = io("http://localhost:5000"); // Backend server address

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
  });
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    socket.on("login_success", (data) => {
      setFormData({
        email: "",
        password: "",
      });
      toast.success("Login successful!");
      localStorage.setItem('token', data.token); 
      setIsAuthenticated(true);
      console.log("Token:", data.token);
    });

    socket.on("login_error", (data) => {
      toast.error("Error: " + data.error);
    });

    return () => {
      socket.off("login_success");
      socket.off("login_error");
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("login", formData);
  };

  return (
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md mt-2 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
  );
};

export default LoginForm;
