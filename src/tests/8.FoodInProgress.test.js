import { screen, act, render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import Routes from '../helpers/Routes';

const CONST_8 = 8;

describe('8 - Testa na tela de comidas em progresso se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('8.1 - Os checkboxes'
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
    history.push('/foods/52771/in-progress');

    const checkboxList = await screen.findAllByRole('checkbox');
    expect(checkboxList).toHaveLength(CONST_8);

    checkboxList.forEach((checkbox) => {
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });

  it('8.2 - Se é possível favoritar da tela de comida em progresso', async () => {
    const history = createMemoryHistory();
    await act(async () => {
      render(
        <Router history={ history }>
          <SearchProvider>
            <Routes />
          </SearchProvider>
        </Router>,
      );
      history.push('/foods/52771/in-progress');

      const favBtn = await screen.findByTestId('favorite-btn');
      expect(favBtn).toBeInTheDocument();
      userEvent.click(favBtn);
      userEvent.click(favBtn);
    });
  });
});
