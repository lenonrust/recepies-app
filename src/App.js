import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './helpers/Routes';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
