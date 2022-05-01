import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendationCard from '../components/RecommendationCard';
import './FoodDetails.css';

const TWENTY = 20;
const FAVORITE_CHECKED = 'favorite-checked';
const copy = require('clipboard-copy');

function FoodDetails(props) {
  const history = useHistory();
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [displayClipboardMessage, setDisplayClipboardMessage] = useState(false);
  const [favBtn, setFavBtn] = useState('favorito');

  const verifyFavorite = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localData && localData.some((element) => element.id === id)) {
      setFavBtn(FAVORITE_CHECKED);
    }
  };

  const copyToShare = () => {
    setDisplayClipboardMessage(true);
    const url = window.location.href;
    copy(url);
  };

  useEffect(() => {
    const searchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.meals[0]);
    };
    searchMeals();
    verifyFavorite();
  }, []);

  const filterIngredients = () => {
    const array = [];
    for (let index = 1; index <= TWENTY; index += 1) {
      if (details[`strIngredient${index}`] !== ''
      && details[`strIngredient${index}`] !== null) {
        array
          .push(`${details[`strIngredient${index}`]}: ${details[`strMeasure${index}`]}`);
      }
    }
    return array;
  };

  const favoriteRecipe = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteObject = {
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strMeal,
      image: details.strMealThumb,
    };
    if (!localData) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObject]));
      setFavBtn(FAVORITE_CHECKED);
    } else if (localData.some((element) => element.id === favoriteObject.id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(localData.filter((data) => data.id !== favoriteObject.id)));
      setFavBtn('favorito');
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...localData, favoriteObject]));
      setFavBtn(FAVORITE_CHECKED);
    }
  };

  useEffect(() => {
    setIngredient(filterIngredients());
  }, [details]);

  return (
    <div>
      <img
        width="150px"
        height="150px"
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt={ details.strMeal }
      />
      <h2 data-testid="recipe-title">{ details.strMeal }</h2>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyToShare }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button
        className={ favBtn }
        data-testid="favorite-btn"
        type="button"
        onClick={ favoriteRecipe }
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      { displayClipboardMessage && <span>Link copied!</span> }
      <h3 data-testid="recipe-category">{details.strCategory}</h3>
      {ingredient.map((itr, index) => (
        <p
          key={ `ingredient${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {itr}
        </p>
      ))}
      <p data-testid="instructions">{details.strInstructions}</p>
      <iframe
        data-testid="video"
        title="myvideo"
        width="320"
        height="200"
        src={ (details.strYoutube) && details.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
      />
      <RecommendationCard title="Meals" />
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => history.push(`/foods/${details.idMeal}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }) }),
}.isRequired;

export default FoodDetails;
