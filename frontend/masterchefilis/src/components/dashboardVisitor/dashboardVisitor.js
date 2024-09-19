import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitorDashboard = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await axios.get('http://localhost:8081/api/recetas');
    setRecipes(response.data);
  };

  const voteRecipe = async (id) => {
    await axios.post(`http://localhost:8081/api/recetas/${id}/voto`);
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h2>Visitor Dashboard</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{recipe.nombre}</h5>
                <p className="card-text">{recipe.descripcion}</p>
                <button className="btn btn-primary" onClick={() => voteRecipe(recipe.id)}>
                  Vote (Likes: {recipe.votos})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorDashboard;
