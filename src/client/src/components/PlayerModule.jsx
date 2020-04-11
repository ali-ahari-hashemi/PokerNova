import React from 'react';
import './PlayerModule.css';
import Card from './Card';
import PulsatingCircle from './PulsatingCircle';

function PlayerModule(props) {
  const { player, status, total, active, pocket = [{}, {}], isWinner } = props;

  console.log('player', props);
  return (
    <div className="Container">
      <div className="CardsContainer">
        {pocket.map((card) => (
          <Card {...card} />
        ))}
      </div>

      {active && <PulsatingCircle />}
      <div
        className={`PlayerModule ${active ? 'PlayerModuleActive' : ''} ${
          isWinner ? 'PlayerModuleWinner' : ''
        }`}
      >
        <div className="PlayerModuleTotalContainer">
          <p className="PlayerModuleTotalText">${total}</p>
        </div>
        <div className="PlayerModuleDetailsContainer">
          <p className="PlayerModulePlayerText OneLine">{player}</p>
        </div>
      </div>

      {status && (
        <div className="StatusBar">
          <p className="StatusText">{status}</p>
        </div>
      )}
    </div>
  );
}

export default PlayerModule;
