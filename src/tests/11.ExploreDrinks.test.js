import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Routes from '../helpers/Routes';
import renderWithRouterAndProvider, { history } from './renderWithProviderAndRouter';

const fetchMock = require('../../cypress/mocks/fetch');

const exploreDrinksPath = '/explore/drinks';
global.fetch = fetchMock;

describe('10 - Testa na tela de explorar se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('10.1 - A tela Explore Drinks contém os elementos conforme'
      + ' esperado', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });
    history.push('/explore/');

    const exploreDrinkBtn = await screen
      .findByRole('button', { name: /explore drinks/i });
    userEvent.click(exploreDrinkBtn);

    expect(history.location.pathname).toBe(exploreDrinksPath);

    const perfilBtn = await screen.findByRole('button', { name: /profile-icon/i });
    const drinkBtn = screen.getByRole('button', { name: /drink-icon/i });
    const ingredientBtn = screen.getByRole('button', { name: /by ingredient/i });
    const surpriseBtn = screen.getByRole('button', { name: /surprise me!/i });

    expect(perfilBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(ingredientBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();
  });

  it('10.2 - A tela Explore Drinks by Ingredient contém os elementos conforme'
      + ' esperado', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });
    history.push(exploreDrinksPath);

    const ingredientBtn = await screen.findByRole('button', { name: /by ingredient/i });
    userEvent.click(ingredientBtn);

    const perfilBtn = await screen.findByRole('button', { name: /profile-icon/i });
    const drinkBtn = screen.getByRole('button', { name: /drink-icon/i });
    const firstIngredient = screen.getByTestId('0-ingredient-card');

    expect(firstIngredient).toBeInTheDocument();
    expect(perfilBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();

    userEvent.click(firstIngredient);
  });

  it('10.3 - O botão Surprise Me funciona'
      + ' conforme esperado', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });
    history.push(exploreDrinksPath);

    const surpriseBtn = await screen.findByRole('button', { name: /surprise me!/i });
    userEvent.click(surpriseBtn);
  });
});
