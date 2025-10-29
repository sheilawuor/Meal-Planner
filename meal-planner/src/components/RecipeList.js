import React, { useEffect, useState, useContext } from "react";
import mockRecipes from "../Data/mockRecipes";
import RecipeCard from "./RecipeCard";
import SortBar from "./SortBar";
import {MealPlanContext} from "../Context/MealPlanContext";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDiet, setFilterDiet] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const { addToMealPlan } = useContext(MealPlanContext);


  
  useEffect(() => {
    fetch("http://localhost:8000/meals")
      .then((res) => res.json())
      .then((data) =>{
        if (Array.isArray(data) && data.length > 0) {
          setRecipes(data);
        } else {
          setRecipes(mockRecipes);
        }
      } )
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  function applyFilters(items) {
    let filtered = [...items];

    
    if (query.trim()) {
      filtered = filtered.filter((r) =>
        (r.title || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (r) => (r.type || "").toLowerCase() === filterType.toLowerCase()
      );
    }

    if (filterDiet !== "all") {
      filtered = filtered.filter(
        (r) => (r.diet || "").toLowerCase() === filterDiet.toLowerCase()
      );
    }

    if (sortOption === "name-asc")
      filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    if (sortOption === "name-desc")
      filtered.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    if (sortOption === "cal-asc")
      filtered.sort((a, b) => (a.calories || 0) - (b.calories || 0));
    if (sortOption === "cal-desc")
      filtered.sort((a, b) => (b.calories || 0) - (a.calories || 0));

    return filtered;
  }

  const visible = applyFilters(recipes);

    return (
    <div style={{ padding: "20px" }}>
      <h2>Filter by Type</h2>
      <div className="filter-buttons">
        {["all", "breakfast", "lunch", "dinner", "dessert"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={filterType === type ? "active" : ""}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <h2>Filter by Diet</h2>
      <div className="filter-buttons">
        {["all", "vegetarian", "vegan", "high-protein", "gluten"].map((diet) => (
          <button
            key={diet}
            onClick={() => setFilterDiet(diet)}
            className={filterDiet === diet ? "active" : ""}
          >
            {diet.charAt(0).toUpperCase() + diet.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
        />

        <SortBar value={sortOption} onChange={setSortOption} />
      </div>

      {visible.length === 0 ? (
        <p className="empty">No recipes found.</p>
      ) : (
        <div className="grid">
          {visible.map((r) => (
            <RecipeCard key={r.id} recipe={r} onAdd={() => addToMealPlan(r)}/>
          ))}
        </div>
      )}
    </div>
  
  );
  
}
