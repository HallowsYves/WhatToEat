import { useState } from 'react'
import Wheel from './components/Wheel/Wheel'
import './App.css'

function App() {
  const names = ['Yves', 'Lebron', 'James', 'Heidy', 'Sam', 'Nina', 'Leo'];



  return (
    <div>
      <h1>Spin the Wheel!</h1>
      <Wheel segments={names} />
    </div>
  );
}

export default App
