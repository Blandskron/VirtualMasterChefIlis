import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Aquí puedes agregar estilos generales si lo necesitas
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importar Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
