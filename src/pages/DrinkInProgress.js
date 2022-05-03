import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import favoriteRecipes from '../helpers/handlerLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import filterIngredients from '../helpers/filterIngredients';
import { finishDrink } from '../helpers/finishRecipe';
import BtnFavorite from '../components/BtnFavorite';

const copy = require('clipboard-copy');

const FIFTEEN = 15;

function DrinkInProgress(props) {
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
    if (favorites && favorites.some((element) => element.id === details.idDrink)) {
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
    const ingredients = storageData.cocktails[id];
    if (ingredients) setIngredientList(ingredients);
  };

  const fromStateToStorage = () => {
    const storageData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    storageData.cocktails[id] = ingredientList;
    localStorage.setItem('inProgressRecipes', JSON.stringify(storageData));
  };

  useEffect(() => {
    const searchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.drinks[0]);
    };
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    searchDrinks();
    checkStorage();
    getFromStorage();
    verifyFavorite();
  }, []);

  useEffect(() => {
    setIngredient(filterIngredients(details, FIFTEEN));
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
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    favoriteRecipes(favoriteObject);
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  useEffect(() => {
    setFavBtn(verifyFavorite());
  }, [details]);

  useEffect(() => {
    setFavBtn(verifyFavorite());
  }, [favorites]);

  if (ingredient[0] === 'undefined: undefined') {
    return '';
  }
  return (
    <>
      <img
        width="150px"
        height="150px"
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
      />
      <h2 data-testid="recipe-title">{details.strDrink}</h2>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyToShare }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <BtnFavorite handleFavorite={ handleFavorite } favBtn={ favBtn } />
      { displayClipboardMessage && <span>Link copied!</span> }
      <h3 data-testid="recipe-category">{details.strCategory}</h3>
      { ingredient.map((itr, index) => (
        <div key={ `ingredient${index}` }>
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
            {itr}
          </label>
        </div>
      ))}
      <p data-testid="instructions">{details.strInstructions}</p>
      <button
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ !allIngredientsChecked }
        onClick={ () => finishDrink(details, history) }
      >
        Finish Recipe
      </button>
    </>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinkInProgress;
