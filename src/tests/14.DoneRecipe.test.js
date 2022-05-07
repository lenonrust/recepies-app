import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Routes from '../helpers/Routes';
import renderWithRouterAndProvider, { history } from './renderWithProviderAndRouter';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;

describe('14 - Testa se', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('14.1 - É possível adicionar/remover comidas e bebidas na tela de'
  + ' receitas feitas', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push('/foods/52771/in-progress');

    const checkboxList = await screen.findAllByRole('checkbox');

    checkboxList.forEach((checkbox) => {
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    const finishRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();

    userEvent.click(finishRecipeBtn);

    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/drinks/178319/in-progress');

    const drinkCheckboxList = await screen.findAllByRole('checkbox');

    drinkCheckboxList.forEach((checkbox) => {
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    const finishDrinkRecipeBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishDrinkRecipeBtn).toBeInTheDocument();

    userEvent.click(finishDrinkRecipeBtn);

    expect(history.location.pathname).toBe('/done-recipes');

    const allFilterBtn = await screen.findByTestId('filter-by-all-btn');
    const foodFilterBtn = await screen.findByTestId('filter-by-food-btn');
    const drinkFilterBtn = await screen.findByTestId('filter-by-drink-btn');
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
    const spicyArrabiata = await screen.findByText('Spicy Arrabiata Penne');
    expect(spicyArrabiata).toBeInTheDocument();

    userEvent.click(drinkFilterBtn);
    userEvent.click(allFilterBtn);

    expect(aquamarineCard).toBeInTheDocument();
  });
});
