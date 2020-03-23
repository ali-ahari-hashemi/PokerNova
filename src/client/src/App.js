import React from 'react';
import Card from './components/Card';
import { RANKS, SUITS } from './utilities/constants';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>PokerNova</h1>
      {
        Object.keys(RANKS).map(rank => {
          return Object.keys(SUITS).map(suit => {
            return (<Card
              rank={rank}
              suit={suit}
            />)
          })
        })
      }
    </div>
  );
}

export default App;
