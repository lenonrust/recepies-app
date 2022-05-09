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
      <div className="favorites-recipes-main-container">
        {
          favorites && favorites.map((favorite, index) => (
            favorite.type === 'food'
              ? (
                <div className="favorite-main-container" key={ `favorite-${index}` }>
                  <FavoriteFoodCard
                    favorite={ favorite }
                    index={ index }
                    removeFavoriteState={ removeFavoriteState }
                  />
                </div>)
              : (
                <div className="favorite-main-container" key={ `favorite-${index}` }>
                  <FavoriteDrinkCard
                    favorite={ favorite }
                    index={ index }
                    removeFavoriteState={ removeFavoriteState }
                  />
                </div>)
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
