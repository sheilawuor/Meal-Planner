import { useContext } from "react";
import { MealPlanContext } from "../Context/MealPlanContext";

function MealPlan() {
  const { mealPlan } = useContext(MealPlanContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Meal Plan</h2>
      {mealPlan.length === 0 ? (
        <p>No meals added yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {mealPlan.map((meal, index) => (
            <li
              key={meal.id || index}
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
                src={
                  meal.image ||
                  "https://via.placeholder.com/100?text=No+Image+Available"
                }
                alt={meal.title || "Untitled Meal"}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  marginRight: "15px",
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <strong>{meal.title || "Untitled Meal"}</strong> <br />
                Type: {meal.type || "Unknown"} <br />
                {meal.calories ? `Calories: ${meal.calories}` : ""} <br />
                {meal.description || "No description"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealPlan
