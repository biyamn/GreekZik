import Cart from './components/Cart/Cart';
import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Toppings from './components/Toppings/Toppings';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = (boolean) => {
    setIsOpen(boolean);
  }

  return (
    <>
      {isOpen && <Cart />}
      <Header onOpen={onOpen} />
      <main>
        <Toppings />
      </main>
    </>
  );
}

export default App;