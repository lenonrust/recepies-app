import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from '../components/Header';
import DoneRecipes from '../pages/DoneRecipes';

const profileTopBtn = 'profile-top-btn';
const pageTitle = 'page-title';
const searchTopBtn = 'search-top-btn';
describe('2 - Testing "Header" component', () => {
  // a configuração abaixo(Linhas 12 e 13) corrige problema de funcionalidade do jest ("Not implemented: window.computedStyle(elt, pseudoElt")
  // quando passado parametro title em "render(<Header title = 'Foods'/>)"
  // linhas 15, 28 e 38
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  it('2.1 - Testing if "Header" work as expected when receives title Foods', () => {
    render(<Header title="Foods" />);
    const headerProfileBtn = screen.queryByTestId(profileTopBtn);
    const headerTitle = screen.queryByTestId(pageTitle);
    const headerSearchBtn = screen.queryByTestId(searchTopBtn);

    expect(headerProfileBtn).toBeDefined();
    expect(headerTitle).toHaveTextContent('Foods');
    expect(headerSearchBtn).toBeDefined();
  });
  it('2.2 - Testing if "Header" work as expected when receives title Drinks', () => {
    render(<Header title="Drinks" />);
    const headerProfileBtn = screen.queryByTestId(profileTopBtn);
    const headerTitle = screen.queryByTestId(pageTitle);
    const headerSearchBtn = screen.queryByTestId(searchTopBtn);

    expect(headerProfileBtn).toBeDefined();
    expect(headerTitle).toBeDefined();
    expect(headerSearchBtn).toBeDefined();
  });
  it('2.3 - Testing if "Header" work as'
  + ' expected when receives title Explore Nationalities ',
  () => {
    render(<Header title="Explore Nationalities" />);
    const headerProfileBtn = screen.queryByTestId(profileTopBtn);
    const headerTitle = screen.queryByTestId(pageTitle);
    const headerSearchBtn = screen.queryByTestId(searchTopBtn);

    expect(headerProfileBtn).toBeDefined();
    expect(headerTitle).toHaveTextContent('Explore Nationalities');
    expect(headerSearchBtn).toBeDefined();
  });
  it('2.4 - Testing if "Header" work as expected when receives a diffrent title ',
    () => {
      render(<DoneRecipes title="Done Recipes" />);

      const headerProfileBtn = screen.queryByTestId(profileTopBtn);
      const headerTitle = screen.queryByTestId(pageTitle);
      const headerSearchBtn = screen.queryByTestId(searchTopBtn);

      expect(headerProfileBtn).toBeDefined();
      expect(headerTitle).toHaveTextContent('Done Recipes');
      expect(headerSearchBtn).not.toBeInTheDocument();
    });
  it('2.5 - Testing if Profile button works as expected', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header title="Foods" />
      </Router>,
    );
    const headerProfileBtn = screen.queryByTestId(profileTopBtn);
    expect(headerProfileBtn).toBeDefined();

    userEvent.click(headerProfileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
  it('2.6 - Testing if Search button works as expected', () => {
    render(<Header title="Foods" />);
    const headerSearchBtn = screen.queryByTestId(searchTopBtn);
    userEvent.click(headerSearchBtn);
    const inputSearch = screen.queryByTestId('search-input');
    const ingredientRadioBtn = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadioBtn = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadioBtn = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const execSearchBtn = screen.queryByTestId('exec-search-btn');
    expect(inputSearch).toBeDefined();
    expect(ingredientRadioBtn).toBeDefined();
    expect(nameRadioBtn).toBeDefined();
    expect(firstLetterRadioBtn).toBeDefined();
    expect(execSearchBtn).toBeDefined();
  });
});
