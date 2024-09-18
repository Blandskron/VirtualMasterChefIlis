import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app/App';
import Login from './components/login/Login';
import RecipeList from './components/recipeList/RecipeList';
import RecipeDetail from './components/recipeDetail/RecipeDetail';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recetas" element={<RecipeList />} />
      <Route path="/recetas/:id" element={<RecipeDetail />} />
    </Routes>
  </Router>
);
