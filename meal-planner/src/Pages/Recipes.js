import { useState } from "react";
import RecipeList from "../components/RecipeList";
import { useEffect } from "react";
import mockRecipes from "../Data/mockRecipes";

function Recipes() {
  
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  
    useEffect(() => {
      async function load() {
        try {
          const key = process.env.REACT_APP_SPOONACULAR_KEY;
          if (!key) throw new Error('No key');
          const res = await fetch("http://localhost:8000/recipes")
          const data = await res.json();
          setRecipes(data.results && data.results.length ? data.results : mockRecipes);
        } catch {
          setRecipes(mockRecipes);
        }
      }
      load();
    }, []);
  
    function addToMealPlan(recipe) {
      const primary = (recipe.dishTypes && recipe.dishTypes[0]) || recipe.category || 'other';
      const existsInCategory = mealPlan.some(m => ((m.dishTypes && m.dishTypes[0]) || m.category || 'other') === primary);
      if (existsInCategory) {
        alert(`You already have a ${primary} meal in your plan. Remove it first to add another.`);
        return;
      }
      const item = {
        id: recipe.id || Date.now(),
        title: recipe.title,
        dishTypes: recipe.dishTypes || [primary],
        calories: recipe.calories || (recipe.nutrition && recipe.nutrition.nutrients && recipe.nutrition.nutrients.find(n=>n.name==='Calories')?.amount) || null,
        image: recipe.image,
      };
      setMealPlan(prev => [item, ...prev]);
      setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    }
  
    function addManualMeal(meal) {
      const primary = (meal.dishTypes && meal.dishTypes[0]) || meal.category || 'other';
      const exists = mealPlan.some(m => ((m.dishTypes && m.dishTypes[0]) || m.category || 'other') === primary);
      if (exists) {
        alert(`You already have a ${primary} meal in your plan.`);
        return;
      }
      setMealPlan(prev => [meal, ...prev]);
    }
  
    function removeFromMealPlan(id) {
      const removed = mealPlan.find(m => m.id === id);
      setMealPlan(prev => prev.filter(p => p.id !== id));
      // put removed recipe back into recipes if it has an image/title (re-insert)
      if (removed && removed.title) {
        setRecipes(prev => [ { id: removed.id, title: removed.title, image: removed.image, dishTypes: removed.dishTypes, calories: removed.calories }, ...prev ]);
      }
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
