import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Hacer la solicitud con withCredentials para enviar cookies de sesión
    axios.get('http://localhost:8081/api/recetas', { withCredentials: true })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(() => {
        setError('Error al obtener las recetas. Verifica tu autenticación.');
      });
  }, [navigate]);

  return (
    <div className="container">
      <h2>Lista de Recetas</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {recipes.map(recipe => (
          <li key={recipe.id} className="list-group-item">
            {recipe.nombre} - {recipe.tiempoPreparacion} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
