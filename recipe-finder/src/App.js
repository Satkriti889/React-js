import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const searchRecipes = () => {
    if (!query) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setRecipes(data.meals);
          setSelectedRecipe(null);
        } else {
          setRecipes([]);
          setSelectedRecipe(null);
        }
      });
  };

  // ✨ Function to break instructions into steps
  const getSteps = (text) => {
    return text
      .split(/(?<=[.?!])\s+/) // Split by punctuation + space
      .filter(step => step.trim().length > 0); // Remove empty steps
  };

  return (
    <div className="container">
      <h1>Recipe Finder</h1>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type a recipe name"
      />
      <button onClick={searchRecipes}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {recipes.length === 0 && <p>No recipes found.</p>}

        {recipes.map(recipe => (
          <div
            key={recipe.idMeal}
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </div>
        ))}

        {selectedRecipe && (
          <div className="instructions">
            <h2>{selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
            <h3>Instructions:</h3>
            <ol>
              {getSteps(selectedRecipe.strInstructions).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
