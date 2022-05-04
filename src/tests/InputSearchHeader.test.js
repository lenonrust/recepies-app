import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import handleFoodSearch from '../helpers/getMealsAPI';
import SearchProvider from '../context/SearchProvider';
import InputSearchHeader from '../components/InputSearchHeader';
// import Foods from '../pages/Foods';

const fetchMock = require('../../cypress/mocks/fetch');

jest.spyOn(window, 'alert').mockImplementation(() => {});
global.fetch = jest.fn(fetchMock);

const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const SEARCH_BUTTON = 'exec-search-btn';
// const soupMeals = require('../../cypress/mocks/soupMeals');
// const ginDrinks = require('../../cypress/mocks/ginDrinks');

describe('13 - Implemente os elementos da barra de busca'
  + ' respeitando os atributos descritos no protótipo', () => {
  it('13.1 - Tem os data-testids tanto da barra'
      + ' de busca quanto de todos os radio-buttons', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const nameRadio = screen.getByTestId(NAME_RADIO);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('13.2 - Verifica busca por ingrediente', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('13.3 - Verifica busca por nome', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByTestId(NAME_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'soup');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('13.4 - Verifica busca por letra', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('13.5 - Verifica se ao realizar busca por letra digitando mais de 1 letra '
  + 'é retornado um alerta informando com o texto esperado', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const oneCharacterErrorMSG = 'Your search must have only 1 (one) character';
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
    const searchBtn = screen.queryByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'aaa');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    expect(alert).toBeCalledWith(oneCharacterErrorMSG);
  });

  it('13.6 - Verifica se ao encontrar apenas uma receita a '
  + 'página é redirecionada para a página de detalhes', async () => {
    render(

      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );
    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    const nameRadio = await screen.findByTestId(NAME_RADIO);
    expect(searchInput).toBeInTheDocument();

    const searchBtn = await screen.findByTestId(SEARCH_BUTTON);
    expect(searchBtn).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });

  // it('13.7 Verifica se função setFoods é chamada', () => {
  //   const { setFoods } = useContext;
  //   render(
  //     <SearchProvider>
  //       <InputSearchHeader title="Foods" />
  //     </SearchProvider>,
  //   );
  //   // const setFoods = jest.fn(x);

  //   const searchInput = screen.getByTestId(SEARCH_INPUT);
  //   const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
  //   expect(searchInput).toBeInTheDocument();

  //   const searchBtn = screen.getByTestId(SEARCH_BUTTON);
  //   expect(searchBtn).toBeInTheDocument();

  //   userEvent.type(searchInput, 'beef');
  //   userEvent.click(ingredientRadio);
  //   userEvent.click(searchBtn);

  //   expect(setFoods).toBeCalled();
  // });

  it.only('13.7 - Verifica se ao realizar busca que não encontra '
  + 'receita, um alerta é emitido informando a mensagem correspondente', async () => {
    // global.fetch = jest.fn(() => Promise.resolve({
    //   json: () => Promise.resolve({ meals: null }),
    // }));
    jest.mock('../helpers/getMealsAPI');

    global.fetch = jest.fn(() => ({ meals: null }));

    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
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

    expect(handleFoodSearch).toHaveBeenCalled();
    expect(fetch).toBeCalled();
    expect(alert).toBeCalled();
    expect(alert).toBeCalledWith(noRecipeMSG);
  });
});
