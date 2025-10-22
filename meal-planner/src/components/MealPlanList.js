import React, { useState } from "react";
import MealForm from "./MealForm";
import MealPlanItem from "./MealPlanItem";

function MealPlanList() {
  const [meals, setMeals] = useState([
    "Spaghetti Bolognese",
    "Grilled Chicken Salad",
    "Beef Stir Fry",
    "Fish Tacos",
    "Vegetable Curry",
    "Pancakes",
    "Chicken Alfredo",
    "Tuna Sandwich",
    "Lentil Soup",
    "Avocado Toast",
  ]);

  const addMeal = (meal) => setMeals([...meals, meal]);
  const deleteMeal = (mealToDelete) =>
    setMeals(meals.filter((meal) => meal !== mealToDelete));

  return (
    <div className="mealplan-list">
      <h2>Weekly Meal Plan</h2>
      <MealForm onAddMeal={addMeal} />
      {meals.map((meal, index) => (
        <MealPlanItem key={index} meal={meal} onDelete={deleteMeal} />
      ))}
    </div>
  );
}

export default MealPlanList;
