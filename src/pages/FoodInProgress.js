import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import favoriteRecipes from '../helpers/handlerLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import filterIngredients from '../helpers/filterIngredients';
import { finishFood } from '../helpers/finishRecipe';
import BtnFavorite from '../components/BtnFavorite';
import './FoodAndDrinkDetails.css';

const copy = require('clipboard-copy');

const TWENTY = 20;

function FoodInProgress(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [displayClipboardMessage, setDisplayClipboardMessage] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const allIngredientsChecked = ingredientList.length === ingredient.length;
  const history = useHistory();

  const copyToShare = () => {
    setDisplayClipboardMessage(true);
    const url = window.location.href;
    copy(url.replace('/in-progress', ''));
  };

  const verifyFavorite = () => {
    if (favorites && favorites.some((element) => element.id === details.idMeal)) {
      return true;
    }
    return false;
  };

  const [favBtn, setFavBtn] = useState(verifyFavorite());

  const checkStorage = () => {
    const storageData = localStorage.getItem('inProgressRecipes');
    if (!storageData) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { meals: {}, cocktails: {} },
      ));
    }
  };

  const getFromStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredients = storageData.meals[id];
    if (ingredients) setIngredientList(ingredients);
  };

  const fromStateToStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    storageData.meals[id] = ingredientList;
    localStorage.setItem('inProgressRecipes', JSON.stringify(storageData));
  };

  useEffect(() => {
    const searchMeals = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.meals[0]);
    };
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    searchMeals();
    checkStorage();
    getFromStorage();
    verifyFavorite();
  }, []);

  useEffect(() => {
    setIngredient(filterIngredients(details, TWENTY));
  }, [details]);

  useEffect(() => {
    fromStateToStorage();
    setDisplayClipboardMessage(false);
  }, [ingredientList]);

  const handleCheckbox = ({ target }) => {
    if (target.checked) {
      setIngredientList([...ingredientList, target.name]);
    } else {
      const newIngredientList = ingredientList
        .filter((element) => element !== target.name);
      setIngredientList([...newIngredientList]);
    }
  };

  const handleFavorite = () => {
    const favoriteObject = {
      id: details.idMeal,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };
    favoriteRecipes(favoriteObject);
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  useEffect(() => {
    setFavBtn(verifyFavorite());
    console.log('TRYBE');
    console.log('É');
    console.log('BOM');
    console.log('D');
    console.log('+');
    console.log('PARTIU');
    console.log('BACKEND!!');
  }, [details]);

  useEffect(() => {
    setFavBtn(verifyFavorite());
  }, [favorites]);

  if (ingredient[0] === 'undefined: undefined') {
    return '';
  }
  return (
    <div className="main-details-container">
      <img
        className="img-header-details"
        width="150px"
        height="150px"
        data-testid="recipe-photo"
        src={ details.strMealThumb }
        alt={ details.strMeal }
      />
      <div className="header-instructions">
        <h2
          className="title-details"
          data-testid="recipe-title"
        >
          {details.strMeal}

        </h2>
        <div className="header-instructions-buttons">
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyToShare }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <BtnFavorite handleFavorite={ handleFavorite } favBtn={ favBtn } />
        </div>
      </div>
      <div className="display-clipp">
        <h3
          className="category-title"
          data-testid="recipe-category"
        >
          {details.strCategory}
        </h3>
        { displayClipboardMessage && <span className="share-span">Link copied!</span> }
      </div>
      <h4 className="ingredients-title">INGREDIENTS</h4>
      <div className="ingredients-list-in-progress">
        { ingredient.map((itr, index) => (
          <div className="ingredient-in-progress" key={ `ingredient${index}` }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `checkIngredient${index}` }
              style={ ingredientList
                .find((ingredien) => ingredien === itr)
                ? { textDecoration: 'line-through' }
                : { textDecoration: '' } }
            >
              <input
                id={ `checkIngredient${index}` }
                type="checkbox"
                name={ itr }
                onChange={ handleCheckbox }
                checked={ ingredientList.find((ing) => ing === itr) }
              />
              <span className="label-input-inProgress">{itr}</span>
            </label>
          </div>
        ))}

      </div>
      <h4 className="instructions-title">INSTRUCTIONS</h4>
      <p
        className="instructions-inprogress"
        data-testid="instructions"
      >
        {details.strInstructions}
      </p>
      <button
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !allIngredientsChecked }
        onClick={ () => finishFood(details, history) }
      >
        Finish Recipe
      </button>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodInProgress;
