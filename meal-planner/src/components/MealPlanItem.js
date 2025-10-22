

import React from "react";

function MealPlanItem({ meal }) {
  if (!meal) {
    return (
      <div className="meal-card">
        <p>Meal data not available</p>
      </div>
    );
  }

  return (
    <div className="meal-card">
      {meal.image ? (
        <img src={meal.image} alt={meal.title} className="meal-img" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <h3>{meal.title || "Untitled Meal"}</h3>
      <p>{meal.summary ? meal.summary.slice(0, 100) + "..." : "No description"}</p>
    </div>
  );
}

export default MealPlanItem;

