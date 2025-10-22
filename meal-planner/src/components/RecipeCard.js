import React from "react";

function RecipeCard({
  id,
  title,
  image,
  description,
  type,
  calories,
  diet,
  onAdd, 
}) {
  return (
    <article className="recipe-card" data-id={id}>
      {image && <img className="recipe-img" src={image} alt={title} />}
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        {description && (
          <p
            className="recipe-desc"
            
            dangerouslySetInnerHTML={{ __html: description.length > 200 ? `${description.slice(0, 200)}...` : description }}
          />
        )}

        <div className="recipe-meta">
          <span className="meta-item">Type: {type}</span>
          <span className="meta-item">Diet: {diet}</span>
          {calories !== undefined && <span className="meta-item">Calories: {calories}</span>}
        </div>

        {onAdd && (
          <div className="recipe-actions">
            <button className="btn-add" onClick={onAdd}>Add to Planner</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;
