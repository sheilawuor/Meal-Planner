import { useState, useEffect } from "react";
import "./ShoppingList.css";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch existing shopping list items from JSON Server
  useEffect(() => {
    fetch('http://localhost:8000/shoppingList')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Add a new item
  const addItem = () => {
    if (inputValue.trim()) {
      fetch('http://localhost:8000/shoppingList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputValue.trim() })
      })
      .then(res => res.json())
      .then(newItem => {
        setItems([...items, newItem]);
        setInputValue("");
      });
    }
  };

  // Remove an item
  const removeItem = (id) => {
    fetch(`http://localhost:8000/shoppingList/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    });
  };

  return (
    <div className="shopping-list-container">
      <h1>🛒 Shopping List</h1>
      
      <div className="shopping-input-section">
        <h2>Add New Item</h2>
        <div className="input-group">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter shopping item..."
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
      </div>

      <div>
        <h2>Your Items ({items.length})</h2>
        {items.length === 0 ? (
          <div className="empty-state">
            <p>Your shopping list is empty. Add some items above! 🛍️</p>
          </div>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span className="shopping-item-text">{item.name}</span>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ShoppingList;

