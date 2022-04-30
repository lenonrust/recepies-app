import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState({});
  const obj = {
    name: 'food1',
    img: 'bla',
    category: 'beef',
    date: '10-10-2022',
    index: 0,
    tags: ['Pasta', 'Curry'],
  };
  // { MOCK
  //   id: '52771',
  //   type: 'food',
  //   nationality: 'Italian',
  //   category: 'Vegetarian',
  //   alcoholicOrNot: '',
  //   name: 'Spicy Arrabiata Penne',
  //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  // },
  // {
  //   id: '178319',
  //   type: 'drink',
  //   nationality: '',
  //   category: 'Cocktail',
  //   alcoholicOrNot:  'Alcoholic',
  //   name: 'Aquamarine',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  // }

  useEffect(() => {
    setDoneRecipes(obj);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <DoneRecipesCard doneRecipes={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
