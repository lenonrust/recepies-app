import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import './HomePage.css';

const TWELVE = 12;
const FIVE = 5;
function Foods() {
  const history = useHistory();
  const { foods, setFoods,
    ingredient, setIngredient } = useContext(searchContext);
  const [foodCategory, setFoodCategory] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');

  const initialFood = async () => {
    let url = '';
    if (ingredient.length > 1) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    } else { url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; }

    const response = await fetch(url);
    console.log('url: ', url, 'response: ', response);
    const data = await response.json();
    setFoods(data.meals);
    setToggleFilter('');
    setIngredient('');
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
    <div className="main-container">
      <Header title="Foods" />
<<<<<<< HEAD
      <div className="category-section">
=======
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ initialFood }
      >
        All
      </button>
      {foodCategory.slice(0, FIVE).map((cat) => (
>>>>>>> b0db619aa0360eaf39fd5c6b6dac719114912d29
        <button
          className="button-category btn-all-food"
          type="button"
          data-testid="All-category-filter"
          onClick={ initialFood }
        >
          All
        </button>
<<<<<<< HEAD
        { foodCategory.slice(0, FIVE).map((cat) => (
          <button
            className={ `button-${cat.strCategory} button-category` }
            data-testid={ `${cat.strCategory}-category-filter` }
            type="button"
            key={ `FoodCategory${cat.strCategory}` }
            onClick={ setFilter }
          >
            {cat.strCategory}

          </button>
        )) }
      </div>
      { foods.length >= 1 && (
        <div className="card-section">
          { foods.slice(0, TWELVE).map((iter, index) => (
=======
      ))}
      {foods.length >= 1 && (
        <div>
          {foods.slice(0, TWELVE).map((iter, index) => (
>>>>>>> b0db619aa0360eaf39fd5c6b6dac719114912d29
            <button
              className="button-card"
              type="button"
              key={ `foods${iter.idMeal}` }
              onClick={ () => history.push(`/foods/${iter.idMeal}`) }
            >
              <Card index={ index } name={ iter.strMeal } img={ iter.strMealThumb } />
            </button>))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Foods;

// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
