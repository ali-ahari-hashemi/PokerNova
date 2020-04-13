import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Done from '@material-ui/icons/Done';
import ArrowUp from '@material-ui/icons/ExpandLess';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Clear from '@material-ui/icons/Clear';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './index.scss';

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: 'white',
      },
      track: {
        color: 'white',
      },
      rail: {
        color: 'black',
      },
    },
  },
});

const performAction = (action, gameId, playerId) => {
  fetch('/api/game/performAction', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      action,
      gameId: gameId,
      playerId: playerId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('success performing action');
      } else if (response.status === 404 || response.status === 400) {
        console.log('error performing action');
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      console.log('error performing action');
    });
};

const Button = ({
  renderIcon,
  text,
  action,
  gameId,
  playerId,
  paddingLeft,
  paddingRight,
  className,
}) => {
  return (
    <div
      style={{
        paddingLeft: paddingLeft ? paddingLeft : 5,
        paddingRight: paddingRight ? paddingRight : 5,
      }}
      className="PlayOption"
      onClick={() => performAction(action, gameId, playerId)}
    >
      {renderIcon()}
      <p className={className}>{text}</p>
    </div>
  );
};

const UserControls = ({ callAmount, allInAmount, heighestBet, gameId, playerId }) => {
  const minRaise = heighestBet + 1; // This should probably change at some point
  const [betAmount, setBetAmount] = useState(minRaise);

  return (
    <div className="UserContent">
      <div className="UserContentOptionsContent">
        <Button
          renderIcon={() => <Clear style={{ fill: 'red', marginRight: 5 }} />}
          text="FOLD"
          action={{ actionType: 'fold' }}
          gameId={gameId}
          playerId={playerId}
        />
        {callAmount > 0 ? (
          <Button
            renderIcon={() => <Done style={{ fill: 'green', marginRight: 5 }} />}
            text="CALL"
            action={{ actionType: 'bet', betAmount: parseFloat(callAmount) }}
            gameId={gameId}
            playerId={playerId}
          />
        ) : (
          <Button
            renderIcon={() => <Done style={{ fill: 'green', marginRight: 5 }} />}
            text="CHECK"
            action={{ actionType: 'check' }}
            gameId={gameId}
            playerId={playerId}
          />
        )}

        {betAmount - callAmount === allInAmount ? (
          <Button
            renderIcon={() => <ArrowDropUp style={{ fill: 'orange', marginRight: 5 }} />}
            text="ALL IN"
            action={{ actionType: 'bet', betAmount: parseFloat(allInAmount) }}
            gameId={gameId}
            playerId={playerId}
          />
        ) : (
          <Button
            paddingLeft={20}
            paddingRight={20}
            renderIcon={() => <ArrowUp style={{ fill: 'orange', marginRight: 5 }} />}
            text={`RAISE TO $${betAmount}`}
            className="raiseText"
            action={{ actionType: 'bet', betAmount: parseFloat(betAmount - callAmount) }}
            gameId={gameId}
            playerId={playerId}
          />
        )}
      </div>

      <div className="BetSlider">
        <ThemeProvider theme={muiTheme}>
          <Slider
            min={minRaise}
            max={allInAmount}
            className="Slider"
            value={typeof betAmount === 'number' ? betAmount : 0}
            onChange={(e, newValue) => setBetAmount(newValue)}
            aria-labelledby="input-slider"
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default UserControls;
