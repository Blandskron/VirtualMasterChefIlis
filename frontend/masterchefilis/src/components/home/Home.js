// src/components/home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-3 mb-4">Bienvenido a <span className="brand-name">Virtual Master Chef</span></h1>
        <p className="lead mb-5">Únete a la plataforma culinaria donde la creatividad y el sabor se encuentran. Por favor, elige una opción para continuar:</p>
        <div>
          <Link to="/login" className="btn btn-lg btn-primary mr-3 px-5">Login</Link>
          <Link to="/register" className="btn btn-lg btn-outline-light px-5">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
