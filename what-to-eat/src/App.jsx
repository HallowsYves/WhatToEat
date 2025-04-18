import React from 'react';
import Wheel from './components/Wheel/Wheel';

const App = () => {
  const restaurants = ["Taco Bell", "Chipotle", "Sweetgreen", "In-N-Out", "chick-fa-la", "appleBees"];

  return (
    <div>
      <h1>What to eat?</h1>
      <Wheel items={restaurants} />
    </div>
  );
};

export default App;