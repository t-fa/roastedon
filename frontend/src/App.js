import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import MainLayout from './components/MainLayout';

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
