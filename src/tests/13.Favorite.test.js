import React from 'react';
import { findByTestId, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Routes from '../helpers/Routes';
import renderWithRouterAndProvider, { history } from './renderWithProviderAndRouter';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;

describe('13 - Testa se', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('13.1 - É possível adicionar/remover comidas e bebidas dos favoritos', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push('/foods/52771');

    const addFavoriteFoodBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(addFavoriteFoodBtn);

    history.push('/drinks/178319');

    const addFavoriteDrinkBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(addFavoriteDrinkBtn);

    history.push('/favorite-recipes');

    expect(history.location.pathname).toBe('/favorite-recipes');

    const allFilterBtn = await screen.findByTestId('filter-by-all-btn');
    const foodFilterBtn = screen.getByTestId('filter-by-food-btn');
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const cardImageList = await screen.findAllByTestId(/\d+-horizontal-top-text/);
    const arrebiataCard = screen.getByText('Spicy Arrabiata Penne');
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
    const spicyArrabiata = screen.getByText('Spicy Arrabiata Penne');
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

    history.push('/foods/52771');

    const addFavoriteFoodBtn = await screen.findByTestId('favorite-btn');
    const arrabiata = await screen.findByTestId('recipe-title');
    expect(arrabiata).toHaveTextContent('Spicy Arrabiata Penne');
    userEvent.click(addFavoriteFoodBtn);

    history.push('/drinks/178319');

    const addFavoriteDrinkBtn2 = await screen.findByTestId('favorite-btn');
    userEvent.click(addFavoriteDrinkBtn2);

    history.push('/favorite-recipes');

    expect(history.location.pathname).toBe('/favorite-recipes');

    const aquamarineImageBtn = await screen.findByTestId('0-horizontal-image');
    expect(aquamarineImageBtn).toBeInTheDocument();
    userEvent.click(aquamarineImageBtn);
    expect(history.location.pathname).toBe('/drinks/178319');

    history.push('/favorite-recipes');
    const aquamarineNameBtn = await screen.findByTestId('0-horizontal-name');
    expect(aquamarineNameBtn).toBeInTheDocument();
    userEvent.click(aquamarineNameBtn);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('13.3 - Os cards de foods na página favoritos funcionam como'
  + ' estipulado no protótipo', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push('/foods/52771');

    const addFavoriteFoodBtn = await screen.findByTestId('favorite-btn');
    const arrabiata = await screen.findByTestId('recipe-title');
    expect(arrabiata).toHaveTextContent('Spicy Arrabiata Penne');
    userEvent.click(addFavoriteFoodBtn);

    history.push('/favorite-recipes');

    expect(history.location.pathname).toBe('/favorite-recipes');

    const arrabiataImageBtn = await screen.findByAltText('Spicy Arrabiata Penne');
    expect(arrabiataImageBtn).toBeInTheDocument();
    userEvent.click(arrabiataImageBtn);
    expect(history.location.pathname).toBe('/foods/52771');

    history.push('/favorite-recipes');
    const arrabiataNameBtn = await screen.findByText('Spicy Arrabiata Penne');
    expect(arrabiataNameBtn).toBeInTheDocument();
    userEvent.click(arrabiataNameBtn);

    expect(history.location.pathname).toBe('/foods/52771');
  });
});
