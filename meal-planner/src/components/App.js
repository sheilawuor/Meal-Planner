import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../Pages/Home";
import Recipes from "../Pages/Recipes";
import MealPlan from "../Pages/MealPlan";
import ShoppingList from "../Pages/ShoppingList";
import MealDetails from "../Pages/MealDetails";
import Login from "../Pages/Login";
import { ThemeProvider } from "../Context/ThemeContext";
import { MealPlanProvider } from "../Context/MealPlanContext";
import {UserProvider} from "../Context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import "../Styles/App.css";

function App() {
  return (
    <ThemeProvider>
      <MealPlanProvider>
        <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<MealDetails />} />
            <Route path="/login" element={<Login/>} />
            {/*ProtectedRoutes*/}
            <Route
            path="/meal-plan"
            element={
              <ProtectedRoute>
                <MealPlan/>
              </ProtectedRoute>
            }
            />
            <Route
            path="/shopping-list"
            element={
              <ProtectedRoute>
                <ShoppingList/>
              </ProtectedRoute>
            }
            />
          </Routes>
        </Router>
        </UserProvider>
      </MealPlanProvider>
    </ThemeProvider>
  );
}

export default App;
