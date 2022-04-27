import React from 'react';
import './Card.css';

function Card(index) {
  // data-testid="${index}-recomendation-card"
  return (
    <div className="card-item" data-testid={ `${index}-recomendation-card` }>
      {/* <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3> */}
    </div>
  );
}

export default Card;
