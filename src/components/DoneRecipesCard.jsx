import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ doneRecipes }) {
  const { index, name, img, category, date, tags } = doneRecipes;
  console.log(doneRecipes);
  return (
    <div>
      <img data-testid={ `${index}-horizontal-image` } src={ img } alt={ name } />
      <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
      <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{date}</p>
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
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
  date: PropTypes.string,
  index: PropTypes.number,
  tags: PropTypes.array,
}.isRequired;

export default DoneRecipesCard;

// data-testid="${index}-horizontal-top-text"
// data-testid="${index}-horizontal-name";
// O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
// O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
// As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;
