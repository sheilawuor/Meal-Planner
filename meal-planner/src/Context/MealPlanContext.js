import { createContext, useState, useEffect } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // ✅ Fetch meals from JSON Server
  const fetchMeals = () => {
    fetch("http://localhost:8000/meals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch meals");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched meals:", data);
        setMealPlan(data);

        // 🛒 Build shopping list from all meal ingredients
        const allIngredients = data.flatMap(
          (meal) => meal.ingredients || []
        );
        setShoppingList(allIngredients);
      })
      .catch((err) => console.error("Error fetching meals:", err));
  };

  // ✅ Load meals on mount
  useEffect(() => {
    console.log("Fetching meals from JSON server...");
    fetchMeals();
  }, []);

  // ✅ Add meal and ingredients
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

    // Save to JSON server
    fetch("http://localhost:8000/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save meal");
        console.log("Meal saved:", meal.title);
        fetchMeals(); // 🔁 refresh meal list after saving
      })
      .catch((err) => console.error("Error saving meal:", err));
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
