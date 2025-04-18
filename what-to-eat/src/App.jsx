import React from 'react';
import Wheel from './components/Wheel/Wheel';

const App = () => {
  const restaurants = ["Taco Bell", "Chipotle", "Sweetgreen", "In-N-Out"];

  return (
    <div>
      <h1>What should we eat?</h1>
      <Wheel items={restaurants} />
    </div>
  );
};

export default App;