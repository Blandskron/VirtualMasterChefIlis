import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChefDashboard = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await axios.get('http://localhost:8081/api/recetas');
    setRecipes(response.data);
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:8081/api/recetas/${id}`);
    fetchRecipes();
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h2>Chef Dashboard</h2>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={() => window.location.href = '/create-recipe'}>Create Recipe</button>
          <table className="table">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map(recipe => (
                <tr key={recipe.id}>
                  <td>{recipe.nombre}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => window.location.href = `/edit-recipe/${recipe.id}`}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
