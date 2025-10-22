import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import "../Styles/App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍽️ Meal Planner</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/meal-plan">Meal Plan</Link></li>
        <li><Link to="/shopping-list">Shopping List</Link></li>
      </ul>
      <ToggleTheme />
    </nav>
  );
}

export default Navbar;
