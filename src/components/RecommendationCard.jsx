import React from 'react';
import './Card.css';

function RecommendationCard(index) {
  return (
    <div className="card-item" data-testid={ `${index}-recomendation-card` } />
  );
}

export default RecommendationCard;
