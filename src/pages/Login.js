import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MAX_PASSWORD = 6;

const Login = () => {
  const history = useHistory();
  const [loginState, setLoginstate] = useState({
    emailInput: '',
    password: '',
  });

  const isValidateButton = () => (loginState.emailInput
    .match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{3,}/gi)
    && loginState.password.length > MAX_PASSWORD);

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email: loginState.emailInput }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div>
      <h1>TRYBE RECEPES</h1>
      <form>
        <label htmlFor="email-input">
          E-mail:
          <input
            data-testid="email-input"
            id="email-input"
            type="email"
            onChange={ ({ target }) => setLoginstate({ ...loginState,
              emailInput: target.value }) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            data-testid="password-input"
            id="password"
            type="password"
            onChange={ ({ target }) => setLoginstate({ ...loginState,
              password: target.value }) }
          />

        </label>

        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !isValidateButton() }
          onClick={ handleLogin }
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
