import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchContext from './searchContext';

function SearchProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState({
    inputText: '',
    type: 'ingredient',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [ingredient, setIngredient] = useState('');

  const contexValue = {
    foods,
    setFoods,
    drinks,
    setDrinks,
    search,
    setSearch,
    isVisible,
    setIsVisible,
    ingredient,
    setIngredient,
  };

  return (
    <searchContext.Provider value={ contexValue }>
      { children }
    </searchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
