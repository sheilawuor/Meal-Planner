import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import {useUser} from "../Context/UserContext";
import "../Styles/App.css";

function Navbar() {
  const {user, logout}= useUser();
  const navigate = useNavigate();

  const handleLogout =() =>{
    logout();
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <h2 className="navbar-title">🍽️ Meal Planner</h2>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/recipes">Recipes</NavLink></li>
        <li><NavLink to="/meal-plan">Meal Plan</NavLink></li>
        <li><NavLink to="/shopping-list">Shopping List</NavLink></li>

        {user ?(
          <>
          <li className="user-info">Welcome,{user.username}</li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
          </>
        ):(
          <li><NavLink to="/login">Login</NavLink></li>
        )}

      </ul>
      <ToggleTheme />
    </nav>
  );
}

export default Navbar;
