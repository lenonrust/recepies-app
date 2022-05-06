import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../pages/DoneRecipes.css';

const TEN = 10;

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
    <div className="card-done-recipes">
      <Link className="link" to={ `${type}s/${id}` }>
        <img
          className="card-img"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <div className="type-share">
        <div className="title-category">
          <Link className="link" to={ `${type}s/${id}` }>
            <p className="name-x" data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
          </p>
          {tags && tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ `tag#${tag}` }
            >
              {tag}
            </p>
          ))}
          <p
            className="date"
            data-testid={ `${index}-horizontal-done-date` }
          >
            {doneDate.slice(0, TEN)}
          </p>
        </div>
        <div className="copied-container">
          { displayClipboardMessage && <span className="copied">Link copied!</span> }
        </div>
      </div>
      <div className="shared-button">
        <button
          className="done-recipe-share-icon"
          type="button"
          onClick={ copyToShare }
        >
          <img
            src={ shareIcon }
            alt="shareIcon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
      </div>
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
