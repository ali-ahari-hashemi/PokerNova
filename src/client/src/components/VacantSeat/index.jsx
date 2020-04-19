import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './index.scss';
import { Grid } from '@material-ui/core';

const VacantSeat = ({ gridOverrides }) => (
  <Grid
    container
    xs={12}
    justify={gridOverrides.justifyParent || 'center'}
    style={{ height: '100%' }}
  >
    <Grid item xs={4} direction="column" style={{ height: '100%' }}>
      <div className="vacantSeatContainer">
        <PersonOutlineIcon />
        <p>Vacant Seat</p>
      </div>
    </Grid>
  </Grid>
);

export default VacantSeat;
