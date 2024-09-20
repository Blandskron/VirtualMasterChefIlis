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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/recetas`, {
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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/recetas/${id}/${voteType}`, {}, {
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
    <div className="bg-dark text-white d-flex align-items-center justify-content-center">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning">Panel de Visitantes</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="alert alert-info text-dark">
          <strong>Instrucciones de votación:</strong> Haz clic en "Me gusta" para
          sumar 1 punto a una receta, o "No me gusta" para restar 2 puntos a la
          receta.
        </div>

        {/* Lista de recetas */}
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <div className="card bg-dark text-white border-warning mb-4">
                <div className="card-body">
                  <h5 className="card-title text-warning">{recipe.nombre}</h5>
                  <p className="card-text">
                    <strong>Descripción:</strong> {recipe.descripcion}
                  </p>
                  <p className="card-text">
                    <strong>Tiempo de preparación:</strong> {recipe.tiempoPreparacion}{" "}
                    minutos
                  </p>
                  <p className="card-text">
                    <strong>Dificultad:</strong> {recipe.dificultad}
                  </p>
                  <p className="card-text">
                    <strong>Participante:</strong> {recipe.participante}
                  </p>
                  <p className="card-text">
                    <strong>Votos:</strong> {recipe.votos}
                  </p>

                  <h6 className="text-warning">Ingredientes:</h6>
                  <ul className="list-unstyled">
                    {recipe.ingredientes.map((ingrediente, index) => (
                      <li key={index}>• {ingrediente}</li>
                    ))}
                  </ul>

                  <h6 className="text-warning">Instrucciones:</h6>
                  <p>{recipe.instrucciones}</p>

                  {/* Botones para votar */}
                  <div className="btn-group mt-3 w-100" role="group">
                    <button
                      className="btn btn-success w-50"
                      onClick={() => voteRecipe(recipe.id, "positivo")}
                    >
                      Me gusta 👍 (+1)
                    </button>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => voteRecipe(recipe.id, "negativo")}
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
    </div>
  );
};

export default VisitorDashboard;
