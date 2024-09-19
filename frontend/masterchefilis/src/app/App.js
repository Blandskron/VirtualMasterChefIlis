import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import ChefDashboard from '../components/dashboardChef/ChefDashboard';
import VisitorDashboard from '../components/dashboardVisitor/VisitorDashboard';
import Home from '../components/home/Home';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta de la página de inicio */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
