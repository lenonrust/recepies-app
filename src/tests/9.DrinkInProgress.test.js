import { screen, act, render } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import Routes from '../helpers/Routes';

const CONST_3 = 3;

describe('9 - Testa na tela de detalhes de bebidas se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('9.1 - Os checkboxes'
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
    history.push('/drinks/178319/in-progress');

    const checkboxList = await screen.findAllByRole('checkbox');
    expect(checkboxList).toHaveLength(CONST_3);

    checkboxList.forEach((checkbox) => {
      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });
  });
});
