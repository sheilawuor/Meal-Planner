import React, { useState } from 'react';

export default function MealForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('breakfast');
  const [calories, setCalories] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      id: Date.now(),
      title: title.trim(),
      category,
      calories: calories ? Number(calories) : null,
      image: null,
      dishTypes: [category]
    });
    setTitle(''); setCalories('');
  }

  return (
    <form className="meal-form" onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Meal title" />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <input value={calories} onChange={e => setCalories(e.target.value)} placeholder="Calories (optional)" type="number" />
      <button className="btn" type="submit">Add Meal</button>
    </form>
  );
}
