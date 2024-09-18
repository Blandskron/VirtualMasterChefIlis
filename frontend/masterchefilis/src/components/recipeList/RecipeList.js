import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:8081/api/recetas', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las recetas:", error);
      });
  }, [navigate]);

  return (
    <div className="container">
      <h2 className="mt-4">Lista de Recetas</h2>
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
