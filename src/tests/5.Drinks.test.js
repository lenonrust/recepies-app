import React from 'react';
import { screen, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import SearchProvider from '../context/SearchProvider';
import { drinks } from '../../cypress/mocks/drinkCategories';

const MAX_FILTERS = 5;
const MAX_CARDS = 12;
const fetchMock = require('../../cypress/mocks/fetch');
// jest.spyOn(window, 'alert').mockImplementation(() => {});
// global.fetch = jest.fn(fetchMock);
global.fetch = fetchMock;

describe('5 - Testa na tela de Drinks se'
  + ' ', () => {
  it('5.1 - A tela carrega os filtros de bebidas corretamente'
      + '  e redireciona para o filtro clicado', async () => {
    await act(async () => {
      render(
        <SearchProvider>
          <Drinks title="Drinks" />
        </SearchProvider>,
      );
    });
    // render(
    //   <SearchProvider>
    //     <Drinks title="Drinks" />
    //   </SearchProvider>,
    // );

    let categories = drinks.map(({ strCategory }) => strCategory);
    categories = categories.slice(0, MAX_FILTERS);
    categories.forEach((category) => {
      const filterBtn = screen.getByTestId(`${category}-category-filter`);
      expect(filterBtn).toBeInTheDocument();

      userEvent.click(filterBtn);

      const cards = screen.getAllByTestId(/\d+-recipe-card/);
      expect(cards).toHaveLength(MAX_CARDS);
    });
    const allFilterBtn = screen.getByTestId('All-category-filter');
    expect(allFilterBtn).toBeInTheDocument();
  });

  it('5.2 - A tela carrega as bebidas sem filtro'
      + ' ', async () => {
    render(
      <SearchProvider>
        <Drinks title="Drinks" />
      </SearchProvider>,
    );

    const cocktailFilterBtn = await screen.findByTestId('Cocktail-category-filter');
    const ggRecipe = await screen.findByRole('img', { name: /gg/i });

    expect(cocktailFilterBtn).toBeInTheDocument();
    expect(ggRecipe).toBeInTheDocument();
  });

  it('5.3 - O usuário é redirecionado para a tela de detalhes'
  + ' ao selecionar um card', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={ history }>
          <SearchProvider>
            <Drinks title="Drinks" />
          </SearchProvider>
        </Router>,
      );
    });

    const firstCard = screen.getByTestId('1-recipe-card');
    expect(firstCard).toBeInTheDocument();

    userEvent.click(firstCard);

    expect(history.location.pathname).toBe('/drinks/17222');
  });
});
