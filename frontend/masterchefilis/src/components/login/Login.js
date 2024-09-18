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

    axios.post('http://localhost:8081/api/auth/login', loginData)
      .then(response => {
        // Guardar el token o cualquier otro indicador de éxito (depende de la API)
        localStorage.setItem('token', response.data);
        navigate('/recetas');  // Redirigir a la página de recetas después de un login exitoso
      })
      .catch(error => {
        setError('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
