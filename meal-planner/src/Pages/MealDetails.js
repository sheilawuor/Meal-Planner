// src/Pages/MealDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/App.css";


function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/meals/${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data))
      .catch((err) => console.error("Error fetching meal details:", err));
  }, [id]);

  if (!meal) return <h2 className="loading">Loading meal details...</h2>;

  return (
    <div className="meal-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img src={meal.image} alt={meal.name} className="meal-details-img" />
      <h2>{meal.name}</h2>
      <p><strong>Category:</strong> {meal.category}</p>
      <p><strong>Type:</strong> {meal.type}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {meal.ingredients && meal.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{meal.instructions}</p>
    </div>
  );
}

export default MealDetails;
