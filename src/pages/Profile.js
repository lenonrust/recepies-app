import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import doneIcon from '../images/Profile_page_images/done.svg';
import favoriteIcon from '../images/Profile_page_images/favorite.svg';
import logoutIcon from '../images/Profile_page_images/logout.svg';
import mailIcon from '../images/Profile_page_images/mail.svg';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const [profileEmail, setProfileEmail] = useState('');
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      setProfileEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-main-container">
      <Header title="Profile" />
      <div className="profile-body">
        <div className="profile-user">
          <img className="profile-icon" src={ mailIcon } alt="mail_profile" />
          <p
            className="profile-mail"
            data-testid="profile-email"
          >
            {profileEmail || 'Unknown user' }

          </p>
        </div>
        <div className="profile-buttons-container">
          <button
            className="profile-button"
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <img className="profile-icon" src={ doneIcon } alt="mail_profile" />
            Done Recipes
          </button>
          <button
            className="profile-button"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <img className="profile-icon" src={ favoriteIcon } alt="mail_profile" />
            Favorite Recipes
          </button>
          <button
            className="profile-button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            <img className="profile-icon" src={ logoutIcon } alt="mail_profile" />
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
