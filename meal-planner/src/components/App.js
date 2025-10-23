import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../Pages/Home";
import Recipes from "../Pages/Recipes";
import MealPlan from "../Pages/MealPlan";
import ShoppingList from "../Pages/ShoppingList";
import MealDetails from "../Pages/MealDetails";
import { ThemeProvider } from "../Context/ThemeContext";
import { MealPlanProvider } from "../Context/MealPlanContext";
import "../Styles/App.css";

function App() {
  return (
    <ThemeProvider>
      <MealPlanProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            
            {/* ✅ Support both /mealplan and /meal-plan */}
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/meal-plan" element={<MealPlan />} />

            <Route path="/shoppinglist" element={<ShoppingList />} />
            <Route path="/shopping-list" element={<ShoppingList />} />

            <Route path="/recipes/:id" element={<MealDetails />} />
          </Routes>
        </Router>
      </MealPlanProvider>
    </ThemeProvider>
  );
}

export default App;
