import { useContext } from "react";
import { MealPlanContext } from "../Context/MealPlanContext";

function ShoppingList() {
  const { shoppingList } = useContext(MealPlanContext);

  return (
    <div>
      <h2>Shopping List</h2>
      {shoppingList.length === 0 ? (
        <p>Your shopping list is empty.</p>
      ) : (
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList
