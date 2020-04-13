import React from 'react';
import { Grid } from '@material-ui/core';
import GameTable from '../GameTable';
import PlayersList from '../PlayersList';
import './index.scss';

const GameTableWithPlayers = ({ playerModules, potTotal, boardCards }) => {
  return (
    <Grid container xs={12} style={{ height: '100%' }}>
      <Grid container xs={12} justify="center" key="topPlayers" style={{ height: '25%' }}>
        <PlayersList
          gridOverrides={{
            justify: 'flex-end',
          }}
          type="row"
          playerModules={playerModules}
          idsToRender={[0, 1]}
        />
      </Grid>

      <Grid container xs={12} key="sidePlayersAndGameTable" style={{ height: '50%' }}>
        <PlayersList
          gridOverrides={{
            justifyParent: 'flex-end',
            reverse: true,
          }}
          type="column"
          playerModules={playerModules}
          idsToRender={[6, 7]}
        />
        <GameTable potTotal={potTotal} boardCards={boardCards} playerModules={playerModules} />
        <PlayersList
          gridOverrides={{
            justifyParent: 'flex-start',
          }}
          type="column"
          playerModules={playerModules}
          idsToRender={[2, 3]}
        />
      </Grid>

      <Grid
        container
        direction="row-reverse"
        justify="center"
        xs={12}
        key="bottomPlayers"
        style={{ height: '25%' }}
      >
        <PlayersList
          gridOverrides={{
            justify: 'flex-end',
          }}
          type="row"
          playerModules={playerModules}
          idsToRender={[4, 5]}
        />
      </Grid>
    </Grid>
  );
};

export default GameTableWithPlayers;
