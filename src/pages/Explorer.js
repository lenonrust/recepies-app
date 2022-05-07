import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Explorer.css';

function Explorer() {
  const history = useHistory();
  console.log('TRYBE');
  console.log('É');
  console.log('BOM');
  console.log('D');
  console.log('+');
  console.log('PARTIU');
  console.log('BACKEND!!');
  return (
    <div className="main-container">
      <Header title="Explore" />
      <div className="explore-container">
        <button
          className="btn-explore-foods card-explorer"
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>

        <button
          className="btn-explore-drinks card-explorer"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
