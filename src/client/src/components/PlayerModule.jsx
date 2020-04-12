import React from 'react';
import 'react-slidedown/lib/slidedown.css';
import './PlayerModule.css';
import Card from './Card';
import PulsatingCircle from './PulsatingCircle';
import { useState } from 'react';
import { useEffect } from 'react';

let closeStatusBarTimer = null;

const StatusBar = ({ text }) => {
  const closed = text === undefined || text === '';
  return (
    <div className={`StatusBar ${closed ? 'closed' : ''}`}>
      <p className="StatusText">{text}</p>
    </div>
  );
};

const PlayerModule = (props) => {
  const { player, status, total, active, pocket = [{}, {}], isWinner } = props;

  const [statusText, setStatusText] = useState(status);

  closeStatusBarTimer = setTimeout(() => {
    setStatusText('');
  }, 5000);

  useEffect(() => {
    setStatusText(status);
    clearTimeout(closeStatusBarTimer);
    closeStatusBarTimer;
  }, [status]);

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

      <div className="StatusBarPlaceHolder">
        <StatusBar text={statusText} />
      </div>
    </div>
  );
};

export default PlayerModule;
