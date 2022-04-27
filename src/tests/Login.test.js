import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from '../pages/Login';

describe('Testing Login page', () => {
  it('Testing log in ', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwdInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeDefined();
    expect(passwdInput).toBeDefined();
    expect(loginBtn).toBeDefined();

    userEvent.type(emailInput, 'teste@trybe');
    userEvent.type(passwdInput, '1234567');
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwdInput, '12345');
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwdInput, '1234567');
    expect(loginBtn).not.toBeDisabled();
  });
  it('Testing localStorage operation ', () => {
    // render(<Login />);
  });
  it('Testing path after log in ', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );
    const emailInput = screen.getByTestId('email-input');
    const passwdInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwdInput, '1234567');
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/foods');
  });
});
