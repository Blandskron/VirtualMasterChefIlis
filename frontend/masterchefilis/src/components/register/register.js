import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('visitor'); // Default to 'visitor'
  const navigate = useNavigate(); // Hook para la redirección

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
      role,
    };

    // Determinamos el endpoint en función del rol
    const endpoint =
      role === 'chef'
        ? `${process.env.REACT_APP_API_URL}/api/auth/register/chef`
        : `${process.env.REACT_APP_API_URL}/api/auth/register/general`; // Endpoint para visitors

    try {
      // Realizamos la petición con el endpoint correcto
      await axios.post(endpoint, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('User registered successfully');
      navigate('/'); // Redirigir a login después del registro
    } catch (error) {
      alert('Error registering user');
      console.error(error);
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center">
      <div className="col-md-6">
        <div className="card register-card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Crear Cuenta</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Rol</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="visitor">Visitante</option>
                  <option value="chef">Chef</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
