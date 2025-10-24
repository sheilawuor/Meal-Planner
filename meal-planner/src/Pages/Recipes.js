import { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import mockRecipes from "../Data/mockRecipes";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const key = process.env.REACT_APP_SPOONACULAR_KEY;
        if (!key) throw new Error("No key");
        const res = await fetch("http://localhost:8000/recipes");
        const data = await res.json();
        setRecipes(data.results && data.results.length ? data.results : mockRecipes);
      } catch {
        setRecipes(mockRecipes);
      }
    }
    load();
  }, []);

  function addToMealPlan(recipe) {
    const primary = (recipe.dishTypes && recipe.dishTypes[0]) || recipe.category || "other";
    const existsInCategory = mealPlan.some(
      (m) => ((m.dishTypes && m.dishTypes[0]) || m.category || "other") === primary
    );
    if (existsInCategory) {
      alert(`You already have a ${primary} meal in your plan. Remove it first to add another.`);
      return;
    }
    const item = {
      id: recipe.id || Date.now(),
      title: recipe.title,
      dishTypes: recipe.dishTypes || [primary],
      calories:
        recipe.calories ||
        (recipe.nutrition &&
          recipe.nutrition.nutrients &&
          recipe.nutrition.nutrients.find((n) => n.name === "Calories")?.amount) ||
        null,
      image: recipe.image,
    };
    setMealPlan((prev) => [item, ...prev]);
    setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <section className="section">
        <h2>Discover Recipes</h2>
        <RecipeList recipesFromParent={recipes} onAddToMealPlan={addToMealPlan} />
      </section>
    </div>
  );
}

export default Recipes;
