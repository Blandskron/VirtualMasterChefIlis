// src/components/home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-dark vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-3 mb-4 text-warning">
          Bienvenido a <span className="text-light">Virtual Master Chef</span>
        </h1>
        <p className="lead mb-5 text-light">
          Únete a la plataforma culinaria donde la creatividad y el sabor se encuentran. 
          Por favor, elige una opción para continuar:
        </p>
        <div>
          <Link to="/login" className="btn btn-lg btn-outline-warning m-2 px-5">
            Login
          </Link>
          <Link to="/register" className="btn btn-lg btn-outline-light m-2 px-5">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
