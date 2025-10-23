import { useState, useEffect } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/shoppingList')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = () => {
    if (inputValue.trim()) {
      fetch('http://localhost:3001/shoppingList', {
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

  const removeItem = (id) => {
    fetch(`http://localhost:3001/shoppingList/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    });
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item"
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>🗑️ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
