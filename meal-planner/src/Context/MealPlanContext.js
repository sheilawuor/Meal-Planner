import { createContext, useState } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Add meal to meal plan and its ingredients to shopping list
  const addToMealPlan = (meal) => {
    if (!meal || !meal.id) return;
    const alreadyAdded = mealPlan.some((m) => m.id === meal.id);
    if (alreadyAdded) {
      alert(`${meal.title} is already in your meal plan.`);
      return;
    }
    setMealPlan((prev) => [...prev, meal]);
    if (meal.ingredients && meal.ingredients.length > 0) {
      setShoppingList((prev) =>{
        const newItems = meal.ingredients.filter(
          (ing) => !prev.includes(ing)
        );
        return [...prev, ...newItems];
      });
    }
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
