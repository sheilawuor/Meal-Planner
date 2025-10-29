import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, onAdd }) {
  const title = recipe.title || recipe.name || 'Untitled Recipe';
  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe.id}`}>
        <img src={recipe.image} 
        alt={title} 
        className="recipe-img" />
      </Link>
      <div className="recipe-body">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-cal">
          Calories: {recipe.calories ?? '—'}
          </p>
        <div className="recipe-actions">
          <Link className="btn-link" to={`/recipes/${recipe.id}`}>
          Details
          </Link>
          {onAdd && (
          <button 
          className="btn" 
          onClick={() => onAdd(recipe)}>
            Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
