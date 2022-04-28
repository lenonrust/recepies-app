import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const TWELVE = 12;
const FIVE = 5;
function Drinks() {
  const history = useHistory();
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');
  const { drinks, setDrinks } = useContext(searchContext);

  const initialDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setDrinks(data.drinks);
    setToggleFilter('');
  };

  useEffect(() => {
    initialDrink();
  }, []);

  useEffect(() => {
    const categoryDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setDrinkCategory(data.drinks);
    };
    categoryDrink();
  }, []);

  const filterByCategory = async (target) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerHTML}`;
    const response = await fetch(url);
    const data = await response.json();
    setDrinks(data.drinks);
  };

  const setFilter = ({ target }) => {
    setToggleFilter(target.innerHTML);
    if (toggleFilter === target.innerHTML) {
      initialDrink();
    } else {
      filterByCategory(target);
    }
  };

  return (
    <div>
      <Header title="Drinks" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ initialDrink }
      >
        All
      </button>
      { drinkCategory.slice(0, FIVE).map((cat) => (
        <button
          data-testid={ `${cat.strCategory}-category-filter` }
          type="button"
          key={ `DrinkCategory${cat.strCategory}` }
          onClick={ setFilter }
        >
          {cat.strCategory}

        </button>
      )) }
      { drinks.length > 1 && (
        <div>
          { drinks.slice(0, TWELVE).map((iter, index) => (
            <button
              type="button"
              key={ `drinks${iter.idDrink}` }
              onClick={ () => history.push(`/drinks/${iter.idDrink}`) }
            >
              <Card index={ index } name={ iter.strDrink } img={ iter.strDrinkThumb } />
            </button>)) }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Drinks;

// category list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list

// filterByCategory
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
