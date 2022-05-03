import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Recommendations.css';

const SIX = 6;

function RecommendationCard({ title }) {
  const [recommendations, setRecommendations] = useState([]);

  const requestApi = async () => {
    if (title === 'Drinks') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      setRecommendations(meals);
    } else {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      setRecommendations(drinks);
    }
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div className="carousel">
      { recommendations && recommendations.slice(0, SIX)
        .map((recommendation, index) => {
          let name;
          let img;
          if (title === 'Drinks') {
            name = recommendation.strMeal;
            img = recommendation.strMealThumb;
          } else {
            name = recommendation.strDrink;
            img = recommendation.strDrinkThumb;
          }
          return (
            <div
              data-testid={ `${index}-recomendation-card` }
              className="slide-card"
              key={ `recommendations${index}` }
            >
              <img src={ img } alt={ name } />
              <h3 data-testid={ `${index}-recomendation-title` }>{name}</h3>
            </div>
          );
        })}
    </div>
  );
}

RecommendationCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecommendationCard;
// Bebidas
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=

// Comidas
// https://www.themealdb.com/api/json/v1/1/search.php?s=
