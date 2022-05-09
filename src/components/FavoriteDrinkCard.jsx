import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteCard.css';

const copy = require('clipboard-copy');

function FavoriteDrinkCard({ favorite, index, removeFavoriteState }) {
  const [timer, settimer] = useState(false);
  const history = useHistory();

  const toShare = () => {
    const TIME = 5000;
    copy(`http://localhost:3000/${favorite.type}s/${favorite.id}`);
    settimer(true);
    setInterval(() => {
      settimer(false);
    }, TIME);
  };

  const RemoveFavoriteRecipe = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    removeFavoriteState(favorite.id);
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(localData.filter((data) => data.id !== favorite.id)));
  };

  return (
    <div className="favorite-container">
      <button
        className="favorites-img-btn"
        type="button"
        onClick={ () => history.push(`/drinks/${favorite.id}`) }
      >
        <img
          className="favorites-img"
          data-testid={ `${index}-horizontal-image` }
          src={ favorite.image }
          alt={ favorite.name }
        />
      </button>
      <div className="share-fav-container">
        <button
          className="share-fav-btn share"
          type="button"
          onClick={ toShare }
        >
          <img
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            alt="shareIcon"
          />
        </button>

        <button
          className="share-fav-btn favorite"
          type="button"
          onClick={ RemoveFavoriteRecipe }
        >
          <img
            src={ blackHeartIcon }
            alt="blackHeartIcon"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
      <div className="favorite-title-name">
        <button
          className="fav-btn-name"
          type="button"
          onClick={ () => history.push(`/drinks/${favorite.id}`) }
        >
          <p data-testid={ `${index}-horizontal-name` }>{ favorite.name }</p>
        </button>
        <p
          className="category"
          data-testid={ `${index}-horizontal-top-text` }
        >
          { favorite.alcoholicOrNot }
        </p>
        <div className="link-timer">
          { timer && <p className="paragraph">Link copied!</p>}
        </div>
      </div>
    </div>
  );
}

FavoriteDrinkCard.propTypes = {
  favorite: PropTypes.object,
  index: PropTypes.string,
}.isRequired;

export default FavoriteDrinkCard;
