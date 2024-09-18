import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  const { id } = useParams(); // Obtiene el ID de la receta de la URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get(`http://localhost:8081/api/recetas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setRecipe(response.data);
      })
      .catch(() => {
        setError('Error al obtener los detalles de la receta.');
      });
  }, [id]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!recipe) {
    return <p>Cargando los detalles de la receta...</p>;
  }

  return (
    <div className="container">
      <h2 className="mt-4">Detalles de la Receta: {recipe.nombre}</h2>
      <p><strong>Descripción:</strong> {recipe.descripcion}</p>
      <p><strong>Tiempo de preparación:</strong> {recipe.tiempoPreparacion} minutos</p>
      <p><strong>Dificultad:</strong> {recipe.dificultad}</p>
      <p><strong>Chef:</strong> {recipe.participante}</p>
      <p><strong>Votos:</strong> {recipe.votos}</p>
      
      <h3>Ingredientes</h3>
      <ul className="list-group">
        {recipe.ingredientes.map((ingrediente, index) => (
          <li key={index} className="list-group-item">{ingrediente}</li>
        ))}
      </ul>

      <h3 className="mt-4">Instrucciones</h3>
      <p>{recipe.instrucciones}</p>
    </div>
  );
}

export default RecipeDetail;
