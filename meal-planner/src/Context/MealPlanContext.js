import { createContext, useState } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Add meal to meal plan and its ingredients to shopping list
  const addToMealPlan = (meal) => {
    setMealPlan((prev) => [...prev, meal]);
    if (meal.ingredients) {
      setShoppingList((prev) => [...prev, ...meal.ingredients]);
    }
  };

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addToMealPlan, shoppingList }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};
