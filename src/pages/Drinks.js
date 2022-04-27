import React, { useContext } from 'react';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const TWELVE = 12;
function Drinks() {
  const { drinks } = useContext(searchContext);
  return (
    <div>
      <Header title="Drinks" />
      { drinks.length > 1 && (
        <div>
          { drinks.slice(0, TWELVE).map((iter, index) => (
            <button
              type="button"
              key={ `drinks${iter.idDrink}` }
            >
              <Card index={ index } name={ iter.strDrink } img={ iter.strDrinkThumb } />
            </button>)) }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
