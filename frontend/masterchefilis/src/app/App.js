import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  // Redirigir a la página de inicio de sesión por defecto
  React.useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Bienvenido a la Aplicación de Recetas</h1>
    </div>
  );
}

export default App;
