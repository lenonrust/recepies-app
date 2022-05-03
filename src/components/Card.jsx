import React from 'react';
import './Card.css';

function Card(element) {
  const { index, name, img } = element;
  return (
    <div className="card-item" data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </div>
  );
}

export default Card;
