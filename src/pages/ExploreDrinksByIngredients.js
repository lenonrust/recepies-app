import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ExploreIngredients.css';

const TWELV = 12;

function ExploreDrinksbyIngredients() {
  const [ingredients, setIngredients] = useState();
  const { setIngredient } = useContext(searchContext);
  const history = useHistory();

  const handleIngredients = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(url);
    const { drinks } = await response.json();
    setIngredients(drinks);
  };

  useEffect(() => {
    handleIngredients();
  }, []);
  if (!ingredients) {
    return '';
  }
  const handleSearchIngredient = (ingredient) => {
    setIngredient(ingredient);
    console.log('TRYBE');
    console.log('É');
    console.log('BOM');
    console.log('D');
    console.log('+');
    console.log('PARTIU');
    console.log('BACKEND!!');
    history.push('/drinks');
  };
  return (
    <div className="explore-ingredients-main-container">
      <Header title="Explore Ingredients" />
      <div className="explore-ingredients-section">
        { ingredients.slice(0, TWELV)
          .map((itr, index) => (
            <button
              className="ingredients-explore-buttons"
              key={ `drink-ingredient${index}` }
              type="button"
              onClick={ () => handleSearchIngredient(itr.strIngredient1) }
            >

              <div data-testid={ `${index}-ingredient-card` }>
                <img
                  className="ingredients-explore-image"
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${itr.strIngredient1}-Small.png` }
                  alt={ itr.strIngredient1 }
                />
                <p
                  className="title-explore-ingredients"
                  data-testid={ `${index}-card-name` }
                >
                  {itr.strIngredient1}
                </p>

              </div>
            </button>
          )) }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksbyIngredients;
