import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import handleFoodSearch from '../helpers/getMealsAPI';
import SearchProvider from '../context/SearchProvider';
import InputSearchHeader from '../components/InputSearchHeader';

const fetchMock = require('../../cypress/mocks/fetch');

jest.spyOn(window, 'alert').mockImplementation(() => {});
global.fetch = jest.fn(fetchMock);

const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';

describe('17 - Testa se requisições a API de bebidas é feita'
  + ' conforme esperado', () => {
  it('17.1- Ao não encontrar bebidas', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve({ meals: null }),
    // }));
    // jest.mock('../helpers/getMealsAPI');

    global.fetch = jest.fn(() => ({ meals: null }));

    render(
      <SearchProvider>
        <InputSearchHeader title="Drinks" />
      </SearchProvider>,
    );

    // jest.spyOn(window, 'alert').mockImplementation(() => {});

    const noRecipeMSG = 'Sorry, we haven\'t found any recipes for these filters.';
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    await wait(() => { expect(fetch).toBeCalled(); });

    expect(alert).toBeCalled();
    expect(alert).toBeCalledWith(noRecipeMSG);
  });

  it('17.2 - Ao buscar drinks por letra', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Drinks" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('17.3 - Ao buscar drinks por nome', async () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Drinks" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_RADIO);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'gin');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('17.4 - Ao buscar por ingrediente', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Drinks" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'Light rum');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });

  it('17.5 - Ao buscar sem selecionar radio nem digitar no input', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Drinks" />
      </SearchProvider>,
    );

    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.click(searchBtn);

    expect(fetch).toBeCalled();
  });
});
