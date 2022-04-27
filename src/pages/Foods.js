import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const TWELVE = 12;
const FIVE = 5;
function Foods() {
  const history = useHistory();
  const { foods, setFoods } = useContext(searchContext);
  const [foodCategory, setFoodCategory] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');

  const initialFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setFoods(data.meals);
    setToggleFilter('');
  };

  useEffect(() => {
    initialFood();
  }, []);

  useEffect(() => {
    const categoryFood = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setFoodCategory(data.meals);
    };
    categoryFood();
  }, []);

  const filterByCategory = async (target) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerHTML}`;
    const response = await fetch(url);
    const data = await response.json();
    setFoods(data.meals);
  };

  const setFilter = ({ target }) => {
    setToggleFilter(target.innerHTML);
    if (toggleFilter === target.innerHTML) {
      initialFood();
    } else {
      filterByCategory(target);
    }
  };

  return (
    <div>
      <Header title="Foods" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ initialFood }
      >
        All
      </button>
      { foodCategory.slice(0, FIVE).map((cat) => (
        <button
          data-testid={ `${cat.strCategory}-category-filter` }
          type="button"
          key={ `FoodCategory${cat.strCategory}` }
          onClick={ setFilter }
        >
          {cat.strCategory}

        </button>
      )) }
      { foods.length >= 1 && (
        <div>
          { foods.slice(0, TWELVE).map((iter, index) => (
            <button
              type="button"
              key={ `foods${iter.idMeal}` }
              onClick={ () => history.push(`/foods/${iter.idMeal}`) }
            >
              <Card index={ index } name={ iter.strMeal } img={ iter.strMealThumb } />
            </button>)) }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Foods;

// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
