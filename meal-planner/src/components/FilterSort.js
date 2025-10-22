import React from "react";
import "./FilterSort.css";

function FilterSort({ selectedFilter, setSelectedFilter }) {
  const filters = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Vegetarian",
    "Vegan",
    "Gluten Free",
  ];

  return (
    <div className="filter-sort">
      <h3>Filter by Category</h3>
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter}
            className={selectedFilter === filter ? "active" : ""}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSort;
