import React from 'react';
import { screen, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import Routes from '../helpers/Routes';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;

describe('7 - Testa na tela de detalhes de bebidas se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('7.1 - A tela carrega os cards de bebida corretamente'
      + '  e redireciona para o card escolhido', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={ history }>
          <SearchProvider>
            <Routes />
          </SearchProvider>
        </Router>,
      );
    });

    history.push('/drinks/');
    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();

    userEvent.click(firstCard);

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    const shareBtn = await screen.findByRole('img', { name: /shareicon/i });
    const favBtn = await screen.findByRole('button', { name: /blackhearticon/i });
    const instructions = await screen.findByTestId('instructions');
    const recommendationCard = await screen.findByRole('img', { name: /corba/i });

    expect(firstIngredient).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recommendationCard);

    history.push('/drinks/15997');

    expect(history.location.pathname).toBe('/drinks/15997');

    const favBtn2 = await screen.findByRole('button', { name: /blackhearticon/i });

    userEvent.click(favBtn2);
    userEvent.click(favBtn2);

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
