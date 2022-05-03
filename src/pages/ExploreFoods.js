import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const [surprise, setSurprise] = useState([]);

  const handleSurprise = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { meals } = await response.json();
    setSurprise(meals[0]);
  };

  useEffect(() => {
    handleSurprise();
  }, []);

  return (
    <div>
      <Header title="Explore Foods" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient

      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(`/foods/${surprise.idMeal}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
//
