import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteCard.css';

const copy = require('clipboard-copy');

function FavoriteFoodCard({ favorite, index, removeFavoriteState }) {
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
    <div>
      <button type="button" onClick={ () => history.push(`/foods/${favorite.id}`) }>
        <img
          width="100px"
          height="100px"
          data-testid={ `${index}-horizontal-image` }
          src={ favorite.image }
          alt={ favorite.name }
        />
      </button>
      <button
        type="button"
        onClick={ toShare }
      >
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="shareIcon"
        />
      </button>
      { timer && <p>Link copied!</p>}
      <button
        type="button"
        onClick={ RemoveFavoriteRecipe }
      >
        <img
          src={ blackHeartIcon }
          alt="blackHeartIcon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${favorite.nationality} - ${favorite.category}` }
      </p>
      <button type="button" onClick={ () => history.push(`/foods/${favorite.id}`) }>
        <p data-testid={ `${index}-horizontal-name` }>{ favorite.name }</p>
      </button>
    </div>
  );
}

FavoriteFoodCard.propTypes = {
  favorite: PropTypes.object,
  index: PropTypes.string,
}.isRequired;

export default FavoriteFoodCard;
