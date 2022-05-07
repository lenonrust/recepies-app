import React from 'react';
import { screen, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import SearchProvider from '../context/SearchProvider';
import { meals } from '../../cypress/mocks/mealCategories';

const MAX_FILTERS = 5;
const MAX_CARDS = 12;
const fetchMock = require('../../cypress/mocks/fetch');
// jest.spyOn(window, 'alert').mockImplementation(() => {});
// global.fetch = jest.fn(fetchMock);
global.fetch = fetchMock;

describe('4 - Testa na tela de Foods se'
  + ' ', () => {
  it('4.1 - A tela carrega os filtros de comidas corretamente'
      + '  e redireciona para o filtro clicado', async () => {
    await act(async () => {
      render(
        <SearchProvider>
          <Foods title="Foods" />
        </SearchProvider>,
      );
    });
    // render(
    //   <SearchProvider>
    //     <Foods title="Foods" />
    //   </SearchProvider>,
    // );

    let categories = meals.map(({ strCategory }) => strCategory);
    categories = categories.slice(0, MAX_FILTERS);
    categories.forEach((categorie) => {
      const filterBtn = screen.getByTestId(`${categorie}-category-filter`);
      expect(filterBtn).toBeInTheDocument();

      userEvent.click(filterBtn);

      const cards = screen.getAllByTestId(/\d+-recipe-card/);
      expect(cards).toHaveLength(MAX_CARDS);
    });
    const allFilterBtn = screen.getByTestId('All-category-filter');
    expect(allFilterBtn).toBeInTheDocument();
  });

  it('4.2 - A tela carrega as comidas sem filtro'
      + ' ', async () => {
    render(
      <SearchProvider>
        <Foods title="Foods" />
      </SearchProvider>,
    );

    const goatFilterBtn = await screen.findByTestId('Goat-category-filter');
    const burekRecipe = await screen.findByRole('img', { name: /corba/i });

    expect(goatFilterBtn).toBeInTheDocument();
    expect(burekRecipe).toBeInTheDocument();
  });

  it('4.3 - O usuário é redirecionado para a tela de detalhes'
      + ' ao selecionar um card', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={ history }>
          <SearchProvider>
            <Foods title="Foods" />
          </SearchProvider>
        </Router>,
      );
    });

    const firstCard = screen.getByTestId('1-recipe-card');
    expect(firstCard).toBeInTheDocument();

    userEvent.click(firstCard);

    expect(history.location.pathname).toBe('/foods/52978');
  });
});

it('4.4 - O fetch é chamado conforme solicitado'
    + ' ', async () => {
  global.fetch = jest.fn(fetchMock);
  render(
    <SearchProvider>
      <Foods title="Foods" />
    </SearchProvider>,
  );

  expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
});
