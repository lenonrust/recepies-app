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

describe('6 - Testa na tela de detalhes de comidas se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('6.1 - A tela carrega os filtros de comidas corretamente'
      + '  e redireciona para o filtro clicado', async () => {
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

    history.push('/foods/');
    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();

    userEvent.click(firstCard);
    expect(history.location.pathname).toBe('/foods/52977');

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    const arrabiataTitle = await screen.findByRole('heading', { name: /arrabiata/i });
    const shareBtn = await screen.findByRole('img', { name: /shareicon/i });
    const favBtn = await screen.findByRole('button', { name: /blackhearticon/i });
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const recommendationCard = await screen.findByRole('img', { name: /gg/i });

    expect(firstIngredient).toBeInTheDocument();
    expect(arrabiataTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recommendationCard);
  });

  it('6.2 - Os botões'
      + ' funcionam como esperado', async () => {
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
    history.push('/foods/');

    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();
    history.push('/foods/52771');

    expect(history.location.pathname).toBe('/foods/52771');

    const favBtn = await screen.findByRole('button', { name: /blackhearticon/i });

    userEvent.click(favBtn);
    userEvent.click(favBtn);

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
});
