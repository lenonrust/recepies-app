import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './helpers/Routes';
import './App.css';
import SearchProvider from './context/SearchProvider';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes />
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
