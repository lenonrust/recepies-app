import React, { useState } from 'react';
import PropTypes from 'prop-types';
import handleFoodSearch from '../helpers/getMealsAPI';
import handleDrinksSearch from '../helpers/getDrinksAPI';

function InputSearchHeader({ title }) {
  const [search, setSearch] = useState({
    inputText: '',
    type: 'ingredient',
  });

  const handleChange = ({ target }) => {
    setSearch({ ...search, type: target.value });
  };

  const onSearch = () => {
    const { inputText, type } = search;
    if (type === 'firstLetter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (title.includes('Food')) {
      handleFoodSearch(inputText, type);
    } else if (title.includes('Drink')) {
      handleDrinksSearch(inputText, type);
    }
  };

  return (
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
  );
}

InputSearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default InputSearchHeader;
