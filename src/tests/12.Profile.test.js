import React from 'react';
import { screen, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import Routes from '../helpers/Routes';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;
const history = createMemoryHistory();

beforeEach(async () => {
  await act(async () => {
    render(
      <Router history={ history }>
        <SearchProvider>
          <Routes />
        </SearchProvider>
      </Router>,
    );
  });
});

describe('12 - Testa se'
  + ' ', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('12.1 - Após efetuar login é possível acessar a tela'
      + ' de perfil utilizando um botão no Header', async () => {
    const emailInput = await screen.findByRole('textbox', { name: /e-mail:/i });
    userEvent.type(emailInput, 'trybe@trybe.com');

    const passwordInput = screen.getByLabelText(/password:/i);
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/foods');

    const perfilBtn = await screen.findByRole('button', { name: /profile-icon/i });
    userEvent.click(perfilBtn);

    const emailDisplay = await screen.findByTestId('profile-email');
    expect(emailDisplay).toBeInTheDocument();
  });

  it('12.2 - Se o botão Done Recipes da tela de Perfil funciona conforme '
      + ' protótipo', async () => {
    history.push('/profile/');

    const doneBtn = await screen.findByRole('button', { name: /done recipes/i });
    userEvent.click(doneBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('12.3 - Se o botão Favorite Recipes da tela de Perfil funciona'
      + ' conforme protótipo', async () => {
    history.push('/profile/');

    const favBtn = await screen.findByRole('button', { name: /favorite recipes/i });
    userEvent.click(favBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('12.4 - Se o botão Logout da tela de Perfil funciona'
      + ' conforme protótipo', async () => {
    history.push('/profile/');
    const logoutBtn = await screen.findByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
