import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import BtnFavorite from '../components/BtnFavorite';
import RecommendationCard from '../components/RecommendationCard';
import './DrinkDetails.css';

const FIFTEEN = 15;
const copy = require('clipboard-copy');

function DrinkDetails(props) {
  const history = useHistory();
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  const [displayClipboardMessage, setDisplayClipboardMessage] = useState(false);
  const [ingredient, setIngredient] = useState([]);
  const [hideButton, setHideButtonButton] = useState(false);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [favBtn, setFavBtn] = useState(false);

  const verifyFavorite = () => {
    const localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localData && localData.some((element) => element.id === id)) {
      setFavBtn(true);
    }
  };

  const validateButton = () => {
    const storageData = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storageData) {
      return (storageData && storageData.some((recipe) => recipe.id === id));
    } return false;
  };

  const verifyProgress = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageData && storageData.cocktails) {
      const drinkData = storageData.cocktails;
      if (drinkData[id]) {
        setButtonName('Continue Recipe');
      }
    }
  };

  useEffect(() => {
    const searchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.drinks[0]);
    };
    searchDrinks();
    setHideButtonButton(!validateButton());
    verifyProgress();
    verifyFavorite();
  }, []);

  const copyToShare = () => {
    setDisplayClipboardMessage(true);
    const url = window.location.href;
    copy(url);
  };

  const filterIngredients = () => {
    const array = [];
    for (let index = 1; index <= FIFTEEN; index += 1) {
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
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
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
    <div>
      <img
        width="150px"
        height="150px"
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h2 data-testid="recipe-title">{ details.strDrink }</h2>
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
      { displayClipboardMessage && <span>Link copied!</span> }
      <h3 data-testid="recipe-category">{details.strAlcoholic}</h3>
      {ingredient.map((itr, index) => (
        <p
          key={ `ingredient${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {itr}
        </p>
      ))}
      <p data-testid="instructions">{details.strInstructions}</p>
      <RecommendationCard title="Drinks" />
      { hideButton && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/drinks/${details.idDrink}/in-progress`) }
        >
          {buttonName}
        </button>)}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }) }),
}.isRequired;

export default DrinkDetails;
