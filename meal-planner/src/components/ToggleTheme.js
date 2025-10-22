import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function ToggleTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="toggle-btn">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

export default ToggleTheme;
