import React from "react";
import { NavLink } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import "../Styles/App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">🍽️ Meal Planner</h2>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/recipes">Recipes</NavLink></li>
        <li><NavLink to="/meal-plan">Meal Plan</NavLink></li>
        <li><NavLink to="/shopping-list">Shopping List</NavLink></li>
      </ul>
      <ToggleTheme />
    </nav>
  );
}

export default Navbar;
