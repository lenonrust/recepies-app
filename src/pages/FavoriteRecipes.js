import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import FavoriteFoodCard from '../components/FavoriteFoodCard';
import './DoneRecipes.css';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const removeFavoriteState = (id) => {
    setFavorites(favorites.filter((data) => data.id !== id));
    console.log('TRYBE');
    console.log('É');
    console.log('BOM');
    console.log('D');
    console.log('+');
    console.log('PARTIU');
    console.log('BACKEND!!');
  };

  const filterDrinksFavorites = () => {
    setFavorites(JSON.parse(localStorage
      .getItem('favoriteRecipes')).filter((element) => element.type === 'drink'));
    console.log('VAMOS');
    console.log('LEVAR');
    console.log('ESSA');
    console.log('EQUIPE');
    console.log('MARAVILHOSA');
    console.log('NOS NOSSOS');
    console.log('CORAÇÕES!');
  };

  const filterFoodsFavorites = () => {
    setFavorites(JSON.parse(localStorage
      .getItem('favoriteRecipes')).filter((element) => element.type === 'food'));
    console.log('TRYBE');
    console.log('É');
    console.log('BOM');
    console.log('D');
    console.log('+');
    console.log('PARTIU');
    console.log('BACKEND!!');
  };

  return (
    <div className="done-recipes-main-container">
      <Header title="Favorite Recipes" />
      <div className="done-recipes-body">
        <button
          className="done-recipes-button done-all"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFavorites(JSON
            .parse(localStorage.getItem('favoriteRecipes'))) }
        >
          All
        </button>
        <button
          className="done-recipes-button done-food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterFoodsFavorites }
        >
          Foods
        </button>
        <button
          className="done-recipes-button done-drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinksFavorites }
        >
          Drinks
        </button>
      </div>
      {
        favorites && favorites.map((favorite, index) => (
          favorite.type === 'food'
            ? (
              <div key={ `favorite-${index}` }>
                <FavoriteFoodCard
                  favorite={ favorite }
                  index={ index }
                  removeFavoriteState={ removeFavoriteState }
                />
              </div>)
            : (
              <div key={ `favorite-${index}` }>
                <FavoriteDrinkCard
                  favorite={ favorite }
                  index={ index }
                  removeFavoriteState={ removeFavoriteState }
                />
              </div>)
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
