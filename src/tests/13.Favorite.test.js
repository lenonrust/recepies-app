import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Routes from '../helpers/Routes';
import renderWithRouterAndProvider, { history } from './renderWithProviderAndRouter';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;

const arrabiataPath = '/foods/52771';
const aquamarinePath = '/drinks/178319';
const favoriteBtn = 'favorite-btn';
const favoriteRecipes = '/favorite-recipes';
const spicyArrabiataPenne = /Spicy Arrabiata Penne/i;

describe('13 - Testa se', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('13.1 - É possível adicionar/remover comidas e bebidas dos favoritos', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push(arrabiataPath);

    const addFavoriteFoodBtn = await screen.findByTestId(favoriteBtn);
    userEvent.click(addFavoriteFoodBtn);

    history.push(aquamarinePath);

    const addFavoriteDrinkBtn = await screen.findByTestId(favoriteBtn);
    userEvent.click(addFavoriteDrinkBtn);

    history.push(favoriteRecipes);

    expect(history.location.pathname).toBe(favoriteRecipes);

    const allFilterBtn = await screen.findByTestId('filter-by-all-btn');
    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const cardImageList = await screen.findAllByTestId(/\d+-horizontal-top-text/);
    const arrebiataCard = screen.getByText(spicyArrabiataPenne);
    const aquamarineCard = screen.getByText('Aquamarine');

    expect(allFilterBtn).toBeInTheDocument();
    expect(foodFilterBtn).toBeInTheDocument();
    expect(drinkFilterBtn).toBeInTheDocument();
    expect(cardImageList).toHaveLength(2);
    expect(arrebiataCard).toBeInTheDocument();
    expect(aquamarineCard).toBeInTheDocument();

    userEvent.click(foodFilterBtn);
    expect(arrebiataCard).toBeInTheDocument();
    expect(aquamarineCard).not.toBeInTheDocument();

    userEvent.click(drinkFilterBtn);
    expect(arrebiataCard).not.toBeInTheDocument();

    userEvent.click(allFilterBtn);
    const spicyArrabiata = screen.getByText(spicyArrabiataPenne);
    const removeFavoriteDrinkBtn = await screen.findByTestId('1-horizontal-favorite-btn');
    userEvent.click(removeFavoriteDrinkBtn);

    expect(removeFavoriteDrinkBtn).not.toBeInTheDocument();
    expect(aquamarineCard).not.toBeInTheDocument();
    expect(spicyArrabiata).toBeInTheDocument();
  });

  it('13.2 - Os cards de drinks na página favoritos funcionam como'
  + ' estipulado no protótipo', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push(arrabiataPath);

    const addFavoriteFoodBtn = await screen.findByTestId(favoriteBtn);
    const arrabiata = await screen.findByTestId('recipe-title');
    expect(arrabiata).toHaveTextContent(spicyArrabiataPenne);
    userEvent.click(addFavoriteFoodBtn);

    history.push(aquamarinePath);

    const addFavoriteDrinkBtn2 = await screen.findByTestId(favoriteBtn);
    userEvent.click(addFavoriteDrinkBtn2);

    history.push(favoriteRecipes);

    expect(history.location.pathname).toBe(favoriteRecipes);

    const aquamarineImageBtn = await screen.findByTestId('0-horizontal-image');
    expect(aquamarineImageBtn).toBeInTheDocument();
    userEvent.click(aquamarineImageBtn);
    expect(history.location.pathname).toBe(aquamarinePath);

    history.push(favoriteRecipes);
    const aquamarineNameBtn = await screen.findByTestId('0-horizontal-name');
    expect(aquamarineNameBtn).toBeInTheDocument();
    userEvent.click(aquamarineNameBtn);

    expect(history.location.pathname).toBe(aquamarinePath);
  });

  it('13.3 - Os cards de foods na página favoritos funcionam como'
  + ' estipulado no protótipo', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push(arrabiataPath);

    const addFavoriteFoodBtn = await screen.findByTestId(favoriteBtn);
    const arrabiata = await screen.findByTestId('recipe-title');
    expect(arrabiata).toHaveTextContent(spicyArrabiataPenne);
    userEvent.click(addFavoriteFoodBtn);

    history.push(favoriteRecipes);

    expect(history.location.pathname).toBe(favoriteRecipes);

    const arrabiataImageBtn = await screen.findByAltText(spicyArrabiataPenne);
    expect(arrabiataImageBtn).toBeInTheDocument();
    userEvent.click(arrabiataImageBtn);
    expect(history.location.pathname).toBe(arrabiataPath);

    history.push(favoriteRecipes);
    const arrabiataNameBtn = await screen.findByText(spicyArrabiataPenne);
    expect(arrabiataNameBtn).toBeInTheDocument();
    userEvent.click(arrabiataNameBtn);

    expect(history.location.pathname).toBe(arrabiataPath);
  });
});
