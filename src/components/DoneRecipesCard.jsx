import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipesCard({ doneRecipes, index }) {
  const { name, image, category, doneDate, tags,
    nationality, type, id, alcoholicOrNot } = doneRecipes;
  const [displayClipboardMessage, setDisplayClipboardMessage] = useState(false);

  const copyToShare = () => {
    setDisplayClipboardMessage(true);
    copy(`http://localhost:3000/foods/${id}`);
  };

  return (
    <div>
      <Link to={ `${type}s/${id}` }>
        <img
          className="card-item"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
      </p>
      <Link to={ `${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <button
        type="button"
        onClick={ copyToShare }
      >
        <img
          src={ shareIcon }
          alt="shareIcon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      { displayClipboardMessage && <span>Link copied!</span> }
      {tags && tags.map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ `tag#${tag}` }
        >
          {tag}
        </p>
      ))}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  tags: PropTypes.array,
}.isRequired;

export default DoneRecipesCard;
