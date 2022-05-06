import React from "react";
import { Router } from "react-router-dom";
import SearchProvider from "../context/SearchProvider";
import Routes from "../helpers/Routes";

describe('6 - Testa na tela de detalhes de comidas se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('6.2 - Os botões'
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
    history.push('/foods/');

    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();
    history.push('/foods/52771');

    expect(history.location.pathname).toBe('/foods/52771');

    const favBtn = await screen.findByRole('button', { name: /blackhearticon/i });

    userEvent.click(favBtn);
    userEvent.click(favBtn);

    const startBtn = await screen.findByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
});
