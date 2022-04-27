import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import handleFoodSearch from '../helpers/getMealsAPI';
import handleDrinksSearch from '../helpers/getDrinksAPI';
import searchContext from '../context/searchContext';

function InputSearchHeader({ title }) {
  const [search, setSearch] = useState({
    inputText: '',
    type: 'ingredient',
  });
  const { foods, setFoods, drinks, setDrinks } = useContext(searchContext);
  const handleChange = ({ target }) => {
    setSearch({ ...search, type: target.value });
  };

  const onSearch = async () => {
    const { inputText, type } = search;
    if (type === 'firstLetter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (title.includes('Food')) {
      const dataFood = await handleFoodSearch(inputText, type);
      if (dataFood) {
        setFoods(dataFood);
      } else if (dataFood === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    } else if (title.includes('Drink')) {
      const dataDrinks = await handleDrinksSearch(inputText, type);
      console.log(dataDrinks);
      if (dataDrinks) {
        setDrinks(dataDrinks);
      } else if (dataDrinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };
  return (
    <>
      { foods.length === 1
       && <Redirect to={ `/foods/${foods[0].idMeal}` } />}
      { drinks.length === 1
       && <Redirect to={ `/drinks/${drinks[0].idDrink}` } />}
      <form>
        <label htmlFor="inputSearch">
          <input
            data-testid="search-input"
            type="text"
            id="inputSearch"
            onChange={ ({ target }) => setSearch({ ...search, inputText: target.value }) }
          />
        </label>
        <label htmlFor="ingredientRadio">
          <input
            value="ingredient"
            name="searchRadio"
            id="ingredientRadio"
            data-testid="ingredient-search-radio"
            type="radio"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="nameRadio">
          <input
            value="name"
            id="nameRadio"
            name="searchRadio"
            data-testid="name-search-radio"
            type="radio"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="firstLetterRadio">
          <input
            value="firstLetter"
            id="firstLetterRadio"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ handleChange }
          />
          First Letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ onSearch }
        >
          Search
        </button>
      </form>
    </>
  );
}

InputSearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default InputSearchHeader;
