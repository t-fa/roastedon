import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// components
import MainLayout from './components/MainLayout';
import Info from './components/Info';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainLayout />
      </div>
    </BrowserRouter>
  );
}

export default App;
