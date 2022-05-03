import React from 'react';
import { render, screen } from '@testing-library/react';
// import InputSearchHeader from '../components/InputSearchHeader';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import InputSearchHeader from '../components/InputSearchHeader';

const fetchMock = require('../../cypress/mocks/fetch');

jest.spyOn(window, 'alert').mockImplementation(() => {});
global.fetch = jest.fn(fetchMock);
// const soupMeals = require('../../cypress/mocks/soupMeals');
// const ginDrinks = require('../../cypress/mocks/ginDrinks');

describe('13 - Implemente os elementos da barra de busca'
  + ' respeitando os atributos descritos no protótipo', () => {
  it('13.1 - Tem os data-testids tanto da barra'
      + ' de busca quanto de todos os radio-buttons', () => {
    // cy.visit('http://localhost:3000/foods');
    // const history = createMemoryHistory();
    // render(
    //   <Router history={ history }>
    //     <SearchProvider>
    //       <Header title="Foods" />
    //     </SearchProvider>

    //   </Router>,
    // );

    // const openSearchBtn = screen.getByTestId('search-top-btn');

    // expect(openSearchBtn).toBeInTheDocument();

    // userEvent.click(openSearchBtn);

    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

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

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

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

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

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

    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

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
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

    userEvent.type(searchInput, 'aaa');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);

    expect(alert).toBeCalledWith(oneCharacterErrorMSG);
  });

  it('13.6 - Verifica se ao realizar busca que não encontra '
  + 'receita, um alerta é emitido informando a mensagem correspondente', () => {
    render(
      <SearchProvider>
        <InputSearchHeader title="Foods" />
      </SearchProvider>,
    );

    const noRecipeMSG = 'Sorry, we haven\'t found any recipes for these filters.';
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.queryByTestId('exec-search-btn');

    userEvent.type(searchInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(alert).toBeCalledWith(noRecipeMSG);
  });
});
