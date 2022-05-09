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
  const { drinks, setDrinks, ingredient, setIngredient } = useContext(searchContext);

  const initialDrink = async () => {
    let url = '';
    if (ingredient.length > 1) {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else { url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; }
    const response = await fetch(url);
    const data = await response.json();
    setDrinks(data.drinks);
    setToggleFilter('');
    setIngredient('');
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

  const filterByCategory = async (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setDrinks(data.drinks);
  };

  const setFilter = (id) => {
    setToggleFilter(id);
    if (toggleFilter === id) {
      initialDrink();
    } else {
      filterByCategory(id);
    }
  };

  return (
    <div className="main-container">
      <Header title="Drinks" />
      <div className="category-section">
        <button
          className="button-category btn-all-drink"
          type="button"
          data-testid="All-category-filter"
          onClick={ initialDrink }
        >
          All
        </button>
        { drinkCategory.slice(0, FIVE).map((cat) => (
          <button
            className={ `button-${cat.strCategory === 'Other/Unknown'
              ? 'Other' : cat.strCategory} button-category` }
            data-testid={ `${cat.strCategory}-category-filter` }
            type="button"
            key={ `DrinkCategory${cat.strCategory}` }
            onClick={ () => setFilter(cat.strCategory) }
          >
            { cat.strCategory === 'Other/Unknown' ? 'Other' : cat.strCategory }

          </button>
        )) }
      </div>
      { drinks.length > 1 && (
        <div className="card-section">
          { drinks.slice(0, TWELVE).map((iter, index) => (
            <button
              className="button-card"
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
