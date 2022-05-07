import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import SearchProvider from '../context/SearchProvider';

export const history = createMemoryHistory();

const renderWithRouterAndProvider = (component) => ({
  ...render(
    <Router history={ history }>
      <SearchProvider>
        {component}
      </SearchProvider>
    </Router>,
  ),
  history,
});
export default renderWithRouterAndProvider;
