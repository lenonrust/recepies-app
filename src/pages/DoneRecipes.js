import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  const getFromStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storageData);
    setRenderRecipes(storageData);
  };

  const toRenderRecipes = ({ target }) => {
    switch (target.innerText) {
    case 'All':
      setRenderRecipes(doneRecipes);
      console.log('All');
      break;
    case 'Food':
      setRenderRecipes(doneRecipes.filter((element) => element.type === 'food'));
      console.log('Food');
      break;
    case 'Drinks':
      setRenderRecipes(doneRecipes.filter((element) => element.type === 'drink'));
      console.log('Drinks');
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    getFromStorage();
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ toRenderRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ toRenderRecipes }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ toRenderRecipes }
        >
          Drinks
        </button>
      </div>
      { renderRecipes && renderRecipes.map((recipe, index) => (
        <DoneRecipesCard
          key={ `doneID#${recipe.id}` }
          doneRecipes={ recipe }
          index={ index }
        />)) }
    </div>
  );
}

export default DoneRecipes;
