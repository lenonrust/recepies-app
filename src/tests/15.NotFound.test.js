import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Routes from '../helpers/Routes';
import renderWithRouterAndProvider, { history } from './renderWithProviderAndRouter';

const fetchMock = require('../../cypress/mocks/fetch');

global.fetch = fetchMock;

describe('15 - Testa se', () => {
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  it('14.1 - Ao seguir para uma URL desconhecida a página'
  + ' NotFound renderiza corretamente', async () => {
    await act(async () => {
      renderWithRouterAndProvider(<Routes />);
    });

    history.push('/xablau');

    const notFound = await screen.findByRole('heading', { name: /not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
