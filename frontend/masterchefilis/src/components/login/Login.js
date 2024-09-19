import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('visitor'); // Valor por defecto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud de login con username y password
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        alert('Usuario autenticado exitosamente!');
        
        // Guardar username y password en localStorage para futuras solicitudes
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('role', role);

        // Redirigir según el rol
        if (role === 'chef') {
          navigate('/chef-dashboard');
        } else if (role === 'visitor') {
          navigate('/visitor-dashboard');
        }
      }
    } catch (error) {
      alert('Error al iniciar sesión. Verifique sus credenciales.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="chef">Chef</option>
                    <option value="visitor">Visitor</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
