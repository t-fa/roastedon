import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// components
import Add from './components/Add';
import Jumbotron from './components/Jumbotron';
import ZipCode from './components/ZipCode';

function App() {
  return (
    <BrowserRouter>
      <div class="container">
        <Jumbotron />
        <ZipCode />
        <Info />
        <Add />
      </div>
    </BrowserRouter>
  );
}

export default App;
