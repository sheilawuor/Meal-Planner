import React from "react";


function MealPlanList({ plannedMeals }) {
  return (
    <div className="meal-plan-list">
      <h2>Weekly Meal Plan</h2>

      {plannedMeals.length === 0 ? (
        <p className="empty-msg">No meals planned yet.</p>
      ) : (
        <ul>
          {plannedMeals.map((item) => (
            <li key={item.id} className="meal-plan-item">
              <span className="day">{item.day}:</span>
              <span className="title">{item.title}</span>
              <span className="type">({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealPlanList;

               