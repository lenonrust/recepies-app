import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BtnFavorite({ handleFavorite, favBtn }) {
  return (
    <button
      type="button"
      onClick={ () => handleFavorite() }
    >
      <img
        data-testid="favorite-btn"
        width="25px"
        src={ favBtn ? blackHeartIcon : whiteHeartIcon }
        alt="blackHeartIcon"
      />
    </button>
  );
}

BtnFavorite.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  favBtn: PropTypes.bool.isRequired,
};

export default BtnFavorite;
