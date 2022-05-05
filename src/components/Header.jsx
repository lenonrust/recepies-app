import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import InputSearchHeader from './InputSearchHeader';
import searchContext from '../context/searchContext';
import './Header.css';

function Header({ title }) {
  const { isVisible, setIsVisible } = useContext(searchContext);

  const history = useHistory();

  return (
    <div className="header-container">
      <div className="header-buttons">
        { title === 'Foods' || title === 'Drinks' || title === 'Explore Nationalities' ? (
          <button
            className="header-btn"
            type="button"
            onClick={ () => setIsVisible(!isVisible) }
          >
            <img
              className="img-header"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search-icon"
            />

          </button>
        ) : (<div className="invisible" />) }
        <h1 className="header-title" data-testid="page-title">{ title }</h1>
        <button
          className="header-btn"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="img-header"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />

        </button>
      </div>
      { isVisible && <InputSearchHeader title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
