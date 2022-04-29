import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TWELV = 12;

function ExploreFoodsbyNationalities() {
  const [nationality, setNationality] = useState([]);
  const [actualNationality, serActualNationality] = useState('American');
  const [cards, setCards] = useState([]);

  const fetchNationality = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(url);
    const { meals } = await response.json();
    setNationality(meals);
  };

  useEffect(() => {
    fetchNationality();
  }, []);

  const fetchCardsPerNationality = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${actualNationality}`;
    const response = await fetch(url);
    const { meals } = await response.json();
    setCards(meals);
  };

  useEffect(() => {
    fetchCardsPerNationality();
  }, [actualNationality]);

  if (!nationality) {
    return '';
  }
  return (
    <div>
      <Header title="Explore Nationalities" />
      <form>
        <select
          data-testid="explore-by-nationality-dropdown"
          value={ actualNationality }
          onChange={ ({ target }) => serActualNationality(target.value) }
        >
          { nationality.map((itr, index) => (
            <option
              data-testid={ `${itr.strArea}-option` }
              key={ `${itr.strArea}${index}` }
            >
              {itr.strArea}
            </option>
          ))}
        </select>
      </form>
      {cards.slice(0, TWELV).map((card) => (
        <button
          data-testid={ `${card.strMeal}-category-filter` }
          type="button"
          key={ `${card.idMeal}` }
        >
          <img width="120px" src={ card.strMealThumb } alt={ card.strMeal } />
          <h3>{card.strMeal}</h3>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodsbyNationalities;
