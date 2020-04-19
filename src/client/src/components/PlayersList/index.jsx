import React from 'react';
import { Grid } from '@material-ui/core';
import './index.scss';
import PlayerModule from '../PlayerModule/index';
import VacantSeat from '../VacantSeat';

const renderPlayerModule = (playerModules, idToRender, gridOverrides) => (
  <React.Fragment>
    {idToRender < playerModules.length ? (
      <PlayerModule {...playerModules[idToRender]} gridOverrides={gridOverrides} />
    ) : (
      <VacantSeat gridOverrides={gridOverrides} />
    )}
  </React.Fragment>
);

const renderRow = (playerModules, idsToRender, gridOverrides) => (
  <React.Fragment>
    <Grid item xs={3} style={{ height: '100%' }}>
      {renderPlayerModule(playerModules, idsToRender[0], gridOverrides)}
    </Grid>
    <Grid item xs={3} style={{ height: '100%' }}>
      {renderPlayerModule(playerModules, idsToRender[1], gridOverrides)}
    </Grid>
  </React.Fragment>
);

const renderColumn = (playerModules, idsToRender, gridOverrides) => (
  <Grid
    container
    direction={gridOverrides.reverse ? 'column-reverse' : 'column'}
    xs={3}
    style={{ height: '100%' }}
  >
    <Grid item xs style={{ height: '50%' }}>
      {renderPlayerModule(playerModules, idsToRender[0], gridOverrides)}
    </Grid>
    <Grid item xs style={{ height: '50%' }}>
      {renderPlayerModule(playerModules, idsToRender[1], gridOverrides)}
    </Grid>
  </Grid>
);

const PlayersList = ({ type, playerModules, idsToRender, gridOverrides }) => {
  if (type === 'row') {
    return renderRow(playerModules, idsToRender, gridOverrides);
  } else {
    return renderColumn(playerModules, idsToRender, gridOverrides);
  }
};

export default PlayersList;
