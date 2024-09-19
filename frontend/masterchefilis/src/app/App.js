import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../components/register/register';
import Login from '../components/login/Login';
import ChefDashboard from '../components/dashboardChef/crudChef';
import VisitorDashboard from '../components/dashboardVisitor/dashboardVisitor';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
