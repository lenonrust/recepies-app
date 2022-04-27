import React, { useContext } from 'react';
import searchContext from '../context/searchContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const TWELVE = 12;
function Foods() {
  const { foods } = useContext(searchContext);
  return (
    <div>
      <Header title="Foods" />
      { foods.length > 1 && (
        <div>
          { foods.slice(0, TWELVE).map((iter, index) => (
            <button
              type="button"
              key={ `foods${iter.idMeal}` }
            >
              <Card index={ index } name={ iter.strMeal } img={ iter.strMealThumb } />
            </button>)) }
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Foods;
