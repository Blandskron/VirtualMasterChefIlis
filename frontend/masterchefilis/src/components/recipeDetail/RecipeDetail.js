import React, { useState } from 'react';
import axios from 'axios';

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [id, setId] = useState('');

  const handleSearch = () => {
    axios.get(`http://localhost:8081/api/recetas/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("Error al obtener la receta:", error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Buscar Receta por ID</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Introduce el ID de la receta"
        className="form-control mb-2"
      />
      <button onClick={handleSearch} className="btn btn-primary mb-4">Buscar</button>

      {recipe && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{recipe.nombre}</h5>
            <p className="card-text">{recipe.descripcion}</p>
            <ul>
              {recipe.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
