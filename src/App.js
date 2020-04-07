import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// components
import Add from './components/Add';
import Jumbotron from './components/Jumbotron';
import ZipCode from './components/ZipCode';
import Info from './components/Info';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div class="container">
        <Jumbotron />
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
