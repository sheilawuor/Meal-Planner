import { createContext, useState, useEffect } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  
  const fetchMeals = () => {
  fetch("http://localhost:8000/mealPlan")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch meal plan");
      return res.json();
    })
    .then((data) => {
      console.log("Fetched meal plan:", data);
      setMealPlan(data);

      const allIngredients = data.flatMap(
        (meal) => meal.ingredients || []
      );
      setShoppingList(allIngredients);
    })
    .catch((err) => console.error("Error fetching meal plan:", err));
};

  useEffect(() => {
    console.log("Fetching meals from JSON server...");
    fetchMeals();
  }, []);

  const addToMealPlan = (meal) => {
  if (!meal || !meal.id) return;
  const alreadyAdded = mealPlan.some((m) => m.id === meal.id);
  if (alreadyAdded) {
    alert(`${meal.title} is already in your meal plan.`);
    return;
  }

  const newMeal = { ...meal, added: true };
  setMealPlan((prev) => [...prev, newMeal]);

  if (meal.ingredients?.length) {
    setShoppingList((prev) => [
      ...prev,
      ...meal.ingredients.filter((ing) => !prev.includes(ing)),
    ]);
  }

  fetch("http://localhost:8000/mealPlan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMeal),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save meal to plan");
      console.log("Meal added to plan:", newMeal.title);
    })
    .catch((err) => console.error("Error saving meal to plan:", err));
};

  const removeFromMealPlan = (mealId) => {
    setMealPlan((prev) => prev.filter((m) => m.id !== mealId));
  }

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addToMealPlan, shoppingList , removeFromMealPlan}}
    >
      {children}
    </MealPlanContext.Provider>
  );
};
