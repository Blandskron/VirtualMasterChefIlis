import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password
    };

    // Hacer la solicitud de login con withCredentials: true
    axios.post('http://localhost:8081/api/auth/login', loginData, { withCredentials: true })
      .then(response => {
        console.log('Usuario autenticado exitosamente!');
        navigate('/recetas');  // Redirigir a la página de recetas
      })
      .catch(() => {
        setError('Error en el inicio de sesión. Verifica tus credenciales.');
      });
  };

  return (
    <div className="container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Usuario</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
