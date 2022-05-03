import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('19 - Implemente os elementos do menu inferior'
+ ' respeitando os atributos descritos no protótipo', () => {
  it('19.1 - Tem os data-testids solicitados', () => {
    // cy.visit('http://localhost:3000/foods');
    render(<Footer />);

    const drinksBtn = screen.queryByTestId('drinks-bottom-btn');
    const foodsBtn = screen.queryByTestId('food-bottom-btn');
    const exploreBtn = screen.queryByTestId('explore-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
    expect(foodsBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
  });

  it('19.2 - Redireciona para a tela Drinks corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const drinksBtn = screen.queryByTestId('drinks-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('19.3 - Redireciona para a tela Foods corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const foodsBtn = screen.queryByTestId('food-bottom-btn');

    expect(foodsBtn).toBeInTheDocument();
    userEvent.click(foodsBtn);

    expect(history.location.pathname).toBe('/foods');
  });

  it('19.4 - Redireciona para a tela Explore corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const exploreBtn = screen.queryByTestId('explore-bottom-btn');

    expect(exploreBtn).toBeInTheDocument();
    userEvent.click(exploreBtn);

    expect(history.location.pathname).toBe('/explore');
  });
});
