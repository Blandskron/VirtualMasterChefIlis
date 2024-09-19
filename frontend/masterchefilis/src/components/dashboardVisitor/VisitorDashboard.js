import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VisitorDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener credenciales desde localStorage
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  // Convertir username y password en un string base64 para autenticación básica
  const authHeader = 'Basic ' + btoa(username + ':' + password);

  // Función para obtener las recetas del API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/recetas', {
        headers: {
          Authorization: authHeader, // Enviar autenticación básica
        },
      });
      setRecipes(response.data); // Guardar las recetas obtenidas en el estado
    } catch (error) {
      setError('Error al obtener las recetas.');
      console.error('Error fetching recipes:', error);
    }
  };

  // Función para desloguear al usuario
  const handleLogout = () => {
    localStorage.clear(); // Limpiar el localStorage
    navigate('/'); // Redirigir a la página de inicio
  };

  // Función para votar una receta
  const voteRecipe = async (id, voteType) => {
    try {
      await axios.post(`http://localhost:8081/api/recetas/${id}/${voteType}`, {}, {
        headers: {
          Authorization: authHeader, // Enviar autenticación básica
        },
      });
      alert('Voto registrado exitosamente!');
      fetchRecipes(); // Actualizar la lista de recetas después del voto
    } catch (error) {
      setError('Error al votar la receta.');
      console.error('Error voting recipe:', error);
    }
  };

  // Ejecutar fetchRecipes cuando el componente se monta
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Visitor Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="alert alert-info">
        <strong>Instrucciones de votación:</strong> Haz clic en "Me gusta" para sumar 1 punto a una receta, o "No me gusta" para restar 2 puntos a la receta.
      </div>

      {/* Lista de recetas */}
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{recipe.nombre}</h5>
                <p className="card-text"><strong>Descripción:</strong> {recipe.descripcion}</p>
                <p className="card-text"><strong>Tiempo de preparación:</strong> {recipe.tiempoPreparacion} minutos</p>
                <p className="card-text"><strong>Dificultad:</strong> {recipe.dificultad}</p>
                <p className="card-text"><strong>Participante:</strong> {recipe.participante}</p>
                <p className="card-text"><strong>Votos:</strong> {recipe.votos}</p>

                <h6>Ingredientes:</h6>
                <ul>
                  {recipe.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
                </ul>

                <h6>Instrucciones:</h6>
                <p>{recipe.instrucciones}</p>

                {/* Botones para votar */}
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-success"
                    onClick={() => voteRecipe(recipe.id, 'positivo')}
                  >
                    Me gusta 👍 (+1)
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => voteRecipe(recipe.id, 'negativo')}
                  >
                    No me gusta 👎 (-2)
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorDashboard;
