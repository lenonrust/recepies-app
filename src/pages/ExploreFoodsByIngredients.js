import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TWELV = 12;

function ExploreFoodsbyIngredients() {
  const [ingredients, setIngredients] = useState();
  const { setSearch, setClickButton, setIsVisible } = useContext(searchContext);
  const history = useHistory();

  const handleIngredients = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(url);
    const { meals } = await response.json();
    setIngredients(meals);
  };

  useEffect(() => {
    handleIngredients();
  }, []);
  if (!ingredients) {
    return '';
  }

  const handleSearchIngredient = (ingredient) => {
    setSearch({ inputText: ingredient, type: 'ingredient' });
    setIsVisible(true);
    setClickButton(true);
    history.push('/foods');
  };
  return (
    <div>
      <Header title="Explore Ingredients" />
      { ingredients.slice(0, TWELV)
        .map((itr, index) => (
          <button
            key={ `food-ingredient${index}` }
            type="button"
            onClick={ () => handleSearchIngredient(itr.strIngredient) }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${itr.strIngredient}-Small.png` }
                alt={ itr.strIngredient }
              />
              <p data-testid={ `${index}-card-name` }>{itr.strIngredient}</p>

            </div>
          </button>
        )) }
      <Footer />
    </div>
  );
}

export default ExploreFoodsbyIngredients;
