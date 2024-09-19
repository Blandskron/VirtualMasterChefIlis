// src/components/home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido a Virtual Master Chef</h1>
      <p>Por favor, elige una opción para continuar:</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mr-2">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Home;
