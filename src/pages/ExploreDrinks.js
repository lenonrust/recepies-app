import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const [surprise, setSurprise] = useState([]);
  const handleSurprise = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const { drinks } = await response.json();
    setSurprise(drinks[0]);
  };

  useEffect(() => {
    handleSurprise();
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(`/drinks/${surprise.idDrink}`) }
      >
        Surprise me!

      </button>

      <Footer />
    </div>
  );
}

export default ExploreDrinks;
