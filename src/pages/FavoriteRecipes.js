import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import FavoriteFoodCard from '../components/FavoriteFoodCard';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const removeFavoriteState = (id) => {
    setFavorites(favorites.filter((data) => data.id !== id));
  };

  const filterDrinksFavorites = () => {
    setFavorites(JSON.parse(localStorage
      .getItem('favoriteRecipes')).filter((element) => element.type === 'drink'));
  };

  const filterFoodsFavorites = () => {
    setFavorites(JSON.parse(localStorage
      .getItem('favoriteRecipes')).filter((element) => element.type === 'food'));
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavorites(JSON
          .parse(localStorage.getItem('favoriteRecipes'))) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFoodsFavorites }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinksFavorites }
      >
        Drinks
      </button>
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
