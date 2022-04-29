import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    history.push('/drinks');
  };
  return (
    <div>
      <Header title="Explore Ingredients" />
      { ingredients.slice(0, TWELV)
        .map((itr, index) => (
          <button
            key={ `drink-ingredient${index}` }
            type="button"
            onClick={ () => handleSearchIngredient(itr.strIngredient1) }
          >

            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${itr.strIngredient1}-Small.png` }
                alt={ itr.strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>{itr.strIngredient1}</p>

            </div>
          </button>
        )) }
      <Footer />
    </div>
  );
}

export default ExploreDrinksbyIngredients;
