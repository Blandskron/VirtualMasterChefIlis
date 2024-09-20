import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChefDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    nombre: '',
    descripcion: '',
    ingredientes: '',
    instrucciones: '',
    tiempoPreparacion: '',
    dificultad: '',
    participante: '',
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Receta seleccionada para editar
  const [editMode, setEditMode] = useState(false); // Controla si estamos en modo edición
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
      setRecipes(response.data);
    } catch (error) {
      setError('Error al obtener las recetas.');
      console.error('Error fetching recipes:', error);
    }
  };

  // Función para crear una nueva receta
  const createRecipe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/recetas`, newRecipe, {
        headers: {
          Authorization: authHeader,
        },
      });
      alert('Receta creada exitosamente!');
      setNewRecipe({
        nombre: '',
        descripcion: '',
        ingredientes: '',
        instrucciones: '',
        tiempoPreparacion: '',
        dificultad: '',
        participante: '',
      });
      fetchRecipes(); // Actualizar la lista de recetas
    } catch (error) {
      setError('Error al crear la receta.');
      console.error('Error creating recipe:', error);
    }
  };

  // Función para eliminar una receta
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/recetas/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      alert('Receta eliminada exitosamente!');
      fetchRecipes(); // Actualizar la lista de recetas
    } catch (error) {
      setError('Error al eliminar la receta.');
      console.error('Error deleting recipe:', error);
    }
  };

    // Función para desloguear al usuario
    const handleLogout = () => {
      localStorage.clear(); // Limpiar el localStorage
      navigate('/'); // Redirigir a la página de inicio
    };

  // Función para actualizar una receta
  const updateRecipe = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/recetas/${selectedRecipe.id}`, selectedRecipe, {
        headers: {
          Authorization: authHeader,
        },
      });
      alert('Receta actualizada exitosamente!');
      setEditMode(false); // Salir del modo edición
      setSelectedRecipe(null);
      fetchRecipes(); // Actualizar la lista de recetas
    } catch (error) {
      setError('Error al actualizar la receta.');
      console.error('Error updating recipe:', error);
    }
  };

  // Función para manejar el cambio en el formulario de edición
  const handleEditChange = (e) => {
    setSelectedRecipe({
      ...selectedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  // Ejecutar fetchRecipes cuando el componente se monta
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="bg-dark text-white p-5">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-warning">Panel del Chef</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulario para crear una nueva receta */}
        {!editMode && (
          <div className="card bg-dark text-white border-warning mb-4">
            <div className="card-body">
              <h5 className="card-title text-warning">Crear Nueva Receta</h5>
              <form onSubmit={createRecipe}>
                <div className="form-group mb-3">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.nombre}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, nombre: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.descripcion}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, descripcion: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Ingredientes (separados por comas)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.ingredientes}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        ingredientes: e.target.value.split(","),
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Instrucciones</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.instrucciones}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        instrucciones: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Tiempo de Preparación (minutos)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newRecipe.tiempoPreparacion}
                    onChange={(e) =>
                      setNewRecipe({
                        ...newRecipe,
                        tiempoPreparacion: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Dificultad</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.dificultad}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, dificultad: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Participante</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRecipe.participante}
                    onChange={(e) =>
                      setNewRecipe({ ...newRecipe, participante: e.target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Crear Receta
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Formulario para editar una receta si estamos en modo edición */}
        {editMode && selectedRecipe && (
          <div className="card bg-dark text-white border-warning mb-4">
            <div className="card-body">
              <h5 className="card-title text-warning">Editar Receta</h5>
              <form onSubmit={updateRecipe}>
                <div className="form-group mb-3">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={selectedRecipe.nombre}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    className="form-control"
                    value={selectedRecipe.descripcion}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Ingredientes (separados por comas)</label>
                  <input
                    type="text"
                    name="ingredientes"
                    className="form-control"
                    value={selectedRecipe.ingredientes.join(", ")}
                    onChange={(e) =>
                      handleEditChange({
                        target: {
                          name: "ingredientes",
                          value: e.target.value.split(","),
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Instrucciones</label>
                  <input
                    type="text"
                    name="instrucciones"
                    className="form-control"
                    value={selectedRecipe.instrucciones}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Tiempo de Preparación (minutos)</label>
                  <input
                    type="number"
                    name="tiempoPreparacion"
                    className="form-control"
                    value={selectedRecipe.tiempoPreparacion}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Dificultad</label>
                  <input
                    type="text"
                    name="dificultad"
                    className="form-control"
                    value={selectedRecipe.dificultad}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Participante</label>
                  <input
                    type="text"
                    name="participante"
                    className="form-control"
                    value={selectedRecipe.participante}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Actualizar Receta
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => {
                    setEditMode(false); // Salir del modo edición
                    setSelectedRecipe(null);
                  }}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}

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
                    <strong>Tiempo de preparación:</strong>{" "}
                    {recipe.tiempoPreparacion} minutos
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

                  {/* Botones para editar y eliminar recetas */}
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning w-100 mt-2"
                    onClick={() => {
                      setSelectedRecipe(recipe); // Seleccionar la receta para editar
                      setEditMode(true); // Activar el modo edición
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
