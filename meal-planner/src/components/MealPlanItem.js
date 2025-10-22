import React from "react";

function MealPlanItem({ meal, onRemove }) {
  function handleRemove() {
    if (window.confirm(`Remove "${meal.title}" from plan?`)) {
      onRemove && onRemove(meal.id);
    }
  }

  return (
    <li className="meal-plan-item">
      <div className="meal-left">
        {meal.image && <img className="meal-thumb" src={meal.image} alt={meal.title} />}
        <div className="meal-info">
          <div className="meal-title">{meal.title}</div>
          <div className="meal-type">{meal.type}</div>
        </div>
      </div>

      <div className="meal-actions">
        <button className="btn-remove" onClick={handleRemove}>Remove</button>
      </div>
    </li>
  );
}

export default MealPlanItem;

