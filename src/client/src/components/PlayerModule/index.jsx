import React from 'react';
import './index.scss';
import Card from '../Card';
import PulsatingCircle from '../PulsatingCircle';
import { useState } from 'react';
import { useEffect } from 'react';
import { Grid } from '@material-ui/core';

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
  const { player, status, total, active, pocket = [{}, {}], isWinner, gridOverrides } = props;
  const { justifyParent = 'center', justify = 'center', align = 'center' } = gridOverrides;

  const [statusText, setStatusText] = useState(status);

  closeStatusBarTimer = setTimeout(() => {
    setStatusText('');
  }, 5000);

  useEffect(() => {
    setStatusText(status);
    clearTimeout(closeStatusBarTimer);
    closeStatusBarTimer = setTimeout(() => {
      setStatusText('');
    }, 5000);
  }, [status]);

  return (
    <Grid container xs={12} justify={justifyParent} style={{ height: '100%' }}>
      <Grid item xs={10} sm={4} direction="column" style={{ height: '100%' }}>
        <div
          className="playerModuleContainer"
          style={{ justifyContent: justify, alignItems: align }}
        >
          <div className="cardsContainer" key="cards">
            {pocket.map((card) => (
              <div
                className="cardWrapper"
                style={{ width: !card.rank || !card.suit ? '30%' : '100%' }}
              >
                <Card {...card} />
              </div>
            ))}
          </div>
          <div className="playerContentContainer" key="playerContent">
            <div
              className={`PlayerModule ${active ? 'PlayerModuleActive' : ''} ${
                isWinner ? 'PlayerModuleWinner' : ''
              }`}
            >
              {/* {active && <PulsatingCircle />} */}
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
        </div>
      </Grid>
    </Grid>
  );
};

export default PlayerModule;
