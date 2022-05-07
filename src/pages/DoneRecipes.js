import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  const getFromStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storageData);
    setRenderRecipes(storageData);
  };

  const toRenderRecipes = ({ target }) => {
    console.log('TRYBE');
    console.log('É');
    console.log('BOM');
    console.log('D');
    console.log('+');
    console.log('PARTIU');
    console.log('BACKEND!!');
    switch (target.innerText) {
    case 'All':
      setRenderRecipes(doneRecipes);
      break;
    case 'Food':
      setRenderRecipes(doneRecipes.filter((element) => element.type === 'food'));
      break;
    case 'Drinks':
      setRenderRecipes(doneRecipes.filter((element) => element.type === 'drink'));
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    getFromStorage();
  }, []);

  return (
    <div className="done-recipes-main-container">
      <Header title="Done Recipes" />
      <div className="done-recipes-body">
        <button
          className="done-recipes-button done-all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ toRenderRecipes }
        >
          All
        </button>
        <button
          className="done-recipes-button done-food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ toRenderRecipes }
        >
          Food
        </button>
        <button
          className="done-recipes-button done-drink"
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
