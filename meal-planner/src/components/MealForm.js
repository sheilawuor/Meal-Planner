import React, { useState} from "react";

function MealForm({ addMeal }) {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mealName && calories) {
      addMeal({ mealName, calories: parseInt(calories) });
      setMealName("");
      setCalories("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meal Name"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />
      <button type="submit">Add Meal</button>
    </form>
  );
}

export default MealForm;