import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import MealPlanList from '../components/MealPlanList';
import MealForm from '../components/MealForm';
import mockRecipes from '../Data/mockRecipes';

export default function Home() {
  // central state held here so pages can be simple copies if needed
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    // basic load: attempt API via parent repo pattern else fallback
    async function load() {
      try {
        const key = process.env.REACT_APP_SPOONACULAR_KEY;
        if (!key) throw new Error('No key');
        const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${key}`);
        const data = await res.json();
        setRecipes(data.results && data.results.length ? data.results : mockRecipes);
      } catch {
        setRecipes(mockRecipes);
      }
    }
    load();
  }, []);

  // add meal to plan with rules:
  //  - if a meal from that same primary category already exists, do not add another (only one per category)
  //  - remove the recipe from the recipes list when added
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
    <div className="page container">
      <h1>Home</h1>

      <section className="section">
        <h2>Discover Recipes</h2>
        <RecipeList recipesFromParent={recipes} onAddToMealPlan={addToMealPlan} />
      </section>

      <section className="section">
        <h2>Your Meal Plan</h2>
        <MealForm onAdd={addManualMeal} />
        <MealPlanList items={mealPlan} onRemove={removeFromMealPlan} />
      </section>
    </div>
  );
}
