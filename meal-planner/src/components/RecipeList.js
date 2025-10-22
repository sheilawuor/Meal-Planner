import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import SortBar from "./SortBar";

export default function RecipeList({ onAddToMealPlan }) {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDiet, setFilterDiet] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  
  useEffect(() => {
    fetch("http://localhost:8000/meals")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
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
    <div className="recipe-list-container">
      {/* Search & Filter Controls */}
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
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="all">All types</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select
          value={filterDiet}
          onChange={(e) => setFilterDiet(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="all">All diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="High-Protein">High-Protein</option>
          <option value="Gluten">Gluten</option>
        </select>

        <SortBar value={sortOption} onChange={setSortOption} />
      </div>

      {/* Recipe Cards */}
      {visible.length === 0 ? (
        <p className="empty">No recipes found.</p>
      ) : (
        <div className="grid">
          {visible.map((r) => (
            <RecipeCard key={r.id} recipe={r} onAdd={onAddToMealPlan} />
          ))}
        </div>
      )}
    </div>
  );
}
