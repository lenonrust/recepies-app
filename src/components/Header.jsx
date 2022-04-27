import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import InputSearchHeader from './InputSearchHeader';

function Header({ title }) {
  const [isVisible, setIsVisible] = useState(false);

  const history = useHistory();

  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile-icon"
        />

      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { title === 'Foods' || title === 'Drinks' || title === 'Explore Nationalities' ? (
        <button
          type="button"
          onClick={ () => setIsVisible(!isVisible) }
        >
          Search
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />

        </button>
      ) : ('') }
      { isVisible && <InputSearchHeader title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
