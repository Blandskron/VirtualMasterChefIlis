import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app/App';
import Login from './components/login/Login';
import RecipeList from './components/recipeList/RecipeList';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recetas" element={<RecipeList />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
