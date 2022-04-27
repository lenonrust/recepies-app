import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendationCard from '../components/RecommendationCard';

const TWENTY = 20;

function DrinkDetails(props) {
  const { match: { params: { id } } } = props;
  const [details, setDetails] = useState({});
  const [ingredient, setIngredient] = useState([]);
  useEffect(() => {
    const searchDrinks = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDetails(data.meals[0]);
    };
    searchDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);
  // const { strYoutube } = details;

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
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      <h3 data-testid="recipe-category">{details.strCategory}</h3>
      {ingredient.map((itr, index) => (
        <p
          key={ `ingredient${index}` }
          data-testid={ `${details.index}-ingredient-name-and-measure` }
        >
          {itr}
        </p>
      ))}
      <p data-testid="instructions">{details.strInstructions}</p>
      <iframe
        title="myvideo"
        width="420"
        height="315"
        src={ (details.strYoutube) && details.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
      />
      <RecommendationCard index="1" />
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }) }),
}.isRequired;

export default DrinkDetails;
