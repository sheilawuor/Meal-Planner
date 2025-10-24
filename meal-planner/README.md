# Meal Planner App

A web application to plan meals, manage recipes, and create a shopping list. Built with **React** and **JSON Server** for local backend data. Users can browse recipes, add meals to a meal plan, and track ingredients in a shopping list.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Project Structure](#project-structure)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Deployment](#deployment)  
7. [License](#license)  

---

## Features

- Browse a list of predefined recipes.  
- Add meals to a meal plan.  
- View and manage a shopping list.  
- Supports multiple meal types: Breakfast, Lunch, Dinner, Dessert.  
- Local JSON Server backend for data persistence.  

---

## Technologies

- **Frontend:** React, React Hooks, CSS  
- **Backend:** JSON Server  
- **API:** Spoonacular (optional) for recipe data  
- **Tooling:** Node.js, npm  

---

## Project Structure

meal-planner/
│
├─ public/
│ └─ index.html
│
├─ src/
│ ├─ components/
│ │ ├─ RecipeList.js
│ │ ├─ ShoppingList.js
│ │ └─ ...other components
│ │
│ ├─ Pages/
│ │ ├─ Recipes.js
│ │ └─ ...other pages
│ │
│ ├─ Data/
│ │ └─ mockRecipes.js
│ │
│ ├─ App.js
│ └─ index.js
│
├─ db.json
├─ package.json
└─ README.md


---

## Installation

1. Clone the repository:  
```bash
git clone <git@github.com:sheilawuor/Meal-Planner.git>
cd Meal-Planner

---

## Usage

Browse recipes on the Recipes page.

Click Add to Meal Plan to include a meal in your plan.

Go to Shopping List to view ingredients for your meals.

Add custom ingredients manually to your shopping list.

Remove meals or ingredients as needed.

Environment Variables

##Deployment
