import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import BtnFavorite from '../components/BtnFavorite';
import RecommendationCard from '../components/RecommendationCard';
import './FoodAndDrinkDetails.css';

const TWENTY = 20;
const copy = require('clipboard-copy');

function FoodDetails(props) {
  const history = useHistory();
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [displayClipboardMessage, setDisplayClipboardMessage] = useState(false);
  const [favBtn, setFavBtn] = useState(false);
  const [hideButton, setHideButtonButton] = useState(false);
  const [buttonName, setButtonName] = useState('Start Recipe');

  const verifyFavorite = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localData && localData.some((element) => element.id === id)) {
      setFavBtn(true);
      console.log('TRYBE');
      console.log('É');
      console.log('BOM');
      console.log('D');
      console.log('+');
      console.log('PARTIU');
      console.log('BACKEND!!');
    }
  };

  const copyToShare = () => {
    setDisplayClipboardMessage(true);
    const url = window.location.href;
    copy(url);
  };

  const validateButton = () => {
    const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageData) {
      return (storageData.some((recipe) => recipe.id === id));
    } return false;
  };

  const verifyProgress = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageData && storageData.meals) {
      const foodData = storageData.meals;
      if (foodData[id]) {
        setButtonName('Continue Recipe');
      }
    }
  };

  useEffect(() => {
    const searchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.meals[0]);
    };
    searchMeals();
    verifyFavorite();
    setHideButtonButton(!validateButton());
    verifyProgress();
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

  useEffect(() => {
    setIngredient(filterIngredients());
  }, [details]);

  const favoriteRecipe = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteObject = {
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };
    if (!localData) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteObject]));
      setFavBtn(true);
    } else if (localData.some((element) => element.id === favoriteObject.id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(localData.filter((data) => data.id !== favoriteObject.id)));
      setFavBtn(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...localData, favoriteObject]));
      setFavBtn(true);
    }
  };
  return (
    <div className="main-details-container">
      <img
        className="img-header-details"
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt={ details.strMeal }
      />
      <div className="header-instructions">
        <h2
          className="title-details"
          data-testid="recipe-title"
        >
          { details && details.strMeal }
          {/* { details.strMeal && details.strMeal.toUpperCase()} */}

        </h2>
        <div className="header-instructions-buttons">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyToShare }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <BtnFavorite
            handleFavorite={ favoriteRecipe }
            favBtn={ favBtn }
          />
        </div>
      </div>
      <div className="display-clipp">
        <h3
          className="category-title"
          data-testid="recipe-category"
        >
          {details.strCategory}
        </h3>
        {displayClipboardMessage && <span className="share-span">Link copied!</span>}
      </div>
      <h4 className="ingredients-title">INGREDIENTS</h4>
      <ul className="ingredients-list">
        {ingredient.map((itr, index) => (
          <li
            key={ `ingredient${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {itr}
          </li>
        ))}
      </ul>
      <h4 className="instructions-title">INSTRUCTIONS</h4>
      <p
        className="instructions-details"
        data-testid="instructions"
      >
        {details.strInstructions}
      </p>
      <div className="video-player">
        <iframe
          data-testid="video"
          title="myvideo"
          width="340"
          height="200"
          src={ (details.strYoutube) && details.strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
        />
      </div>
      <h4 className="recommendations-title">SUGGESTIONS</h4>
      <RecommendationCard title="Meals" />
      {hideButton && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/foods/${details.idMeal}/in-progress`) }
        >
          {buttonName}
        </button>)}

    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodDetails;
