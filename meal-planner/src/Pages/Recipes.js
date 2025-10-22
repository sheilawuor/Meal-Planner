import { useState, useContext } from "react";
import mockRecipes from "../Data/mockRecipes";
import { MealPlanContext } from "../Context/MealPlanContext";

function Recipes() {
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);
  const { addToMealPlan } = useContext(MealPlanContext); // ✅ extract function from context

  // Filter recipes by type
  const filterByType = (type) => {
    if (type === "all") {
      setFilteredRecipes(mockRecipes);
    } else {
      setFilteredRecipes(
        mockRecipes.filter((recipe) => recipe.type.toLowerCase() === type.toLowerCase())
      );
    }
  };

  // Filter recipes by diet
  const filterByDiet = (diet) => {
    if (diet === "all") {
      setFilteredRecipes(mockRecipes);
    } else {
      setFilteredRecipes(
        mockRecipes.filter((recipe) => recipe.diet.toLowerCase() === diet.toLowerCase())
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter by Type</h2>
      <div>
        <button onClick={() => filterByType("all")}>All</button>
        <button onClick={() => filterByType("breakfast")}>Breakfast</button>
        <button onClick={() => filterByType("lunch")}>Lunch</button>
        <button onClick={() => filterByType("dinner")}>Dinner</button>
        <button onClick={() => filterByType("dessert")}>Dessert</button>
      </div>

      <h2>Filter by Diet</h2>
      <div>
        <button onClick={() => filterByDiet("all")}>All</button>
        <button onClick={() => filterByDiet("vegetarian")}>Vegetarian</button>
        <button onClick={() => filterByDiet("vegan")}>Vegan</button>
        <button onClick={() => filterByDiet("high-protein")}>High-Protein</button>
        <button onClick={() => filterByDiet("gluten")}>Gluten</button>
      </div>

      <h2>Recipes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredRecipes.map((r) => (  // ✅ r is defined here
          <li
            key={r.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={r.image || "https://via.placeholder.com/100?text=No+Image"}
              alt={r.title || "Untitled Meal"}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                marginRight: "15px",
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <strong>{r.title}</strong> <br />
              Type: {r.type} | Diet: {r.diet} <br />
              Calories: {r.calories} <br />
              {r.description}
            </div>
            <button style={{ marginLeft: "15px" }} onClick={() => addToMealPlan(r)}>
              Add to Meal Plan
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
