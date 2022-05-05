import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ExploreFoodsByNationalities.css';

const TWELV = 12;

function ExploreFoodsbyNationalities() {
  const history = useHistory();
  const [nationality, setNationality] = useState([]);
  const [actualNationality, serActualNationality] = useState('All');
  const [cards, setCards] = useState([]);

  const fetchNationality = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(url);
    const { meals } = await response.json();
    setNationality([{ strArea: 'All' }, ...meals]);
  };

  useEffect(() => {
    fetchNationality();
  }, []);

  const fetchCardsPerNationality = async () => {
    let url;
    if (actualNationality === 'All') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${actualNationality}`;
    }
    const response = await fetch(url);
    const { meals } = await response.json();
    console.log(url);
    setCards(meals);
  };

  useEffect(() => {
    fetchCardsPerNationality();
  }, [actualNationality]);

  if (!nationality) {
    return '';
  }
  return (
    <div className="container-nationality">
      <Header title="Explore Nationalities" />
      <form>
        <select
          className="dropdown-nationality"
          data-testid="explore-by-nationality-dropdown"
          value={ actualNationality }
          onChange={ ({ target }) => serActualNationality(target.value) }
        >
          { nationality.map((itr, index) => (
            <option
              className="option-nationality"
              data-testid={ `${itr.strArea}-option` }
              key={ `${itr.strArea}${index}` }
            >
              {itr.strArea}
            </option>
          ))}
        </select>
      </form>
      <div className="card-section-nationality">
        { cards && cards.slice(0, TWELV).map((card, index) => (
          <button
            className="button-card-nationality"
            key={ `${card.idMeal}` }
            data-testid={ `${index}-recipe-card` }
            type="button"
            onClick={ () => history.push(`/foods/${card.idMeal}`) }
          >
            <div className="card-item-nationality">
              <img
                className="card-image-nationality"
                width="120px"
                src={ card.strMealThumb }
                alt={ card.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{card.strMeal}</h3>
            </div>
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ExploreFoodsbyNationalities;
// https://www.themealdb.com/api/json/v1/1/search.php?s=
