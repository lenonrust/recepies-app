import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

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
    <div className="login-section">
      <div className="login-container">
        <img
          // src="https://thumbs.dreamstime.com/b/s%C3%ADmbolo-de-menu-com-chef-e-m%C3%A3o-ilustra%C3%A7%C3%A3o-do-vetor-preto-logo-inscri%C3%A7%C3%A3o-manual-um-chap%C3%A9u-%C3%ADcone-design-logotipo-171643656.jpg"
          // src="https://i.pinimg.com/originals/71/7a/f1/717af1c9a3205855e3e4a6f02d7849fb.png"
          src="https://img.myloview.com.br/quadros/icone-de-sombra-longa-e-linear-do-chapeu-do-chef-400-101400271.jpg"
          alt="cheffImage"
          className="logo-login"
        />
        <h1>
          MUNCHIES APP
        </h1>
        <form className="login-form">
          <label className="label-login" htmlFor="email-input">
            E-mail:
            <input
              className="input-login"
              data-testid="email-input"
              id="email-input"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={ ({ target }) => setLoginstate({ ...loginState,
                emailInput: target.value }) }
            />
          </label>
          <label className="label-login" htmlFor="password">
            Password:
            <input
              placeholder="Digite sua senha"
              className="input-login"
              data-testid="password-input"
              id="password"
              type="password"
              onChange={ ({ target }) => setLoginstate({ ...loginState,
                password: target.value }) }
            />

          </label>

          <button
            className="bnt-login"
            data-testid="login-submit-btn"
            type="button"
            disabled={ !isValidateButton() }
            onClick={ handleLogin }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
