import React from 'react';
import './index.scss';
import Chips from '../Chips';
import { Grid } from '@material-ui/core';
import Board from '../Board';

const renderBets = (playerModules, idsToRender, type) => {
  return idsToRender.map((id) => {
    if (id < playerModules.length && playerModules[id].currentBet > 0) {
      return <Chips amount={10} />;
    } else {
      return <div />;
    }
  });
};

const GameTable = ({ potTotal, boardCards, playerModules }) => (
  <Grid item xs={6} style={{ height: '100%', padding: 16 }}>
    <div className="GameTable">
      <Grid container xs={12} style={{ height: '100%' }}>
        <Grid key="chipsLeft" item xs={1} style={{ height: '100%' }}>
          <Grid
            container
            xs
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ height: '100%' }}
          >
            {renderBets(playerModules, [6, 7], 'column')}
          </Grid>
        </Grid>
        <Grid key="chipsTopAndBottomAndGameTableContent" item xs={10} style={{ height: '100%' }}>
          <Grid container xs={12} direction="column" style={{ height: '100% ' }}>
            <div key="chipsTop" style={{ width: '100%', height: '10%' }}>
              <Grid
                container
                xs
                alignItems="center"
                justify="space-around"
                style={{ height: '100%' }}
              >
                {renderBets(playerModules, [0, 1], 'row')}
              </Grid>
            </div>
            <div key="gameTableContent" className="gameTableContent">
              <p className="PotTotalText">Total Pot: ${potTotal}</p>
              <Board cards={boardCards} />
            </div>
            <div style={{ width: '100%', height: '10%' }}>
              <Grid
                container
                xs
                alignItems="center"
                justify="space-around"
                style={{ height: '100%' }}
              >
                {renderBets(playerModules, [4, 5], 'row')}
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid key="chipsRight" item xs={1} style={{ height: '100%' }}>
          <Grid
            container
            xs
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ height: '100%' }}
          >
            {renderBets(playerModules, [2, 3], 'column')}
          </Grid>
        </Grid>
      </Grid>
    </div>
  </Grid>
);

export default GameTable;
