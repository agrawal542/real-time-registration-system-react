import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import SessionDetails from "./components/SessionDetails";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/sessions"
              element={<ProtectedRoute element={<SessionDetails />} />}
            />
            <Route path="/" element={<RegisterForm />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
