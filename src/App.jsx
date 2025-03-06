import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Register from './pages/Register';
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />            
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


