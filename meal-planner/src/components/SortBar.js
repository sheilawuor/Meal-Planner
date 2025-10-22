import React from 'react';

export default function SortBar({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="none">Sort</option>
      <option value="name-asc">Name A→Z</option>
      <option value="name-desc">Name Z→A</option>
      <option value="cal-asc">Calories ↑</option>
      <option value="cal-desc">Calories ↓</option>
    </select>
  );
}
