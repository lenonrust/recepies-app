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
  const [clickButton, setClickButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contexValue = {
    foods,
    setFoods,
    drinks,
    setDrinks,
    search,
    setSearch,
    clickButton,
    setClickButton,
    isVisible,
    setIsVisible,
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
