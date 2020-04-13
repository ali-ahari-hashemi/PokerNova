import React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './Game.css';
import GameTableWithPlayers from '../components/GameTableWithPlayers';

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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: this.props.callAmount, // Min bet amount
    };
  }

  performAction(action) {
    fetch('/api/game/performAction', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        action,
        gameId: this.props.gameId,
        playerId: this.props.seat,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success performing action');
        } else if (response.status === 404 || response.status === 400) {
          this.setState({ error: 'Something went wrong, try again.' });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        this.setState({ error: 'Error starting game.' });
      });
  }

  handleSliderChange = (event, newValue) => {
    this.setState({ betAmount: newValue });
  };

  render() {
    const {
      statusText,
      timerTimeLeft,
      timerTotalTime,
      potTotal,
      callAmount,
      allInAmount,
      boardCards,
      playerModules,
    } = this.props;

    return (
      <div className="Game">
        <p className="AppLogo">PokerNova&#8482;</p>
        <div className="middleContainer">
          <GameTableWithPlayers
            potTotal={potTotal}
            boardCards={boardCards}
            playerModules={playerModules}
          />
        </div>
        <div className="UserContent">
          <div className="UserContentOptionsContent">
            <div
              className="PlayOption FoldButton"
              onClick={() =>
                this.performAction({
                  actionType: 'fold',
                })
              }
            >
              FOLD
            </div>
            {callAmount > 0 ? (
              <div
                className="PlayOption BetButton"
                onClick={() =>
                  this.performAction({
                    actionType: 'bet',
                    betAmount: parseFloat(callAmount),
                  })
                }
              >
                CALL
              </div>
            ) : (
              <div
                className="PlayOption CheckButton"
                onClick={() =>
                  this.performAction({
                    actionType: 'check',
                  })
                }
              >
                CHECK
              </div>
            )}

            <div
              className="PlayOption BetButton"
              onClick={() =>
                this.performAction({
                  actionType: 'bet',
                  betAmount: parseFloat(allInAmount),
                })
              }
            >
              ALL IN
            </div>
          </div>
          <div className="BetSlider">
            <ThemeProvider theme={muiTheme}>
              <Slider
                min={callAmount}
                max={allInAmount}
                className="Slider"
                value={typeof this.state.betAmount === 'number' ? this.state.betAmount : 0}
                onChange={(e, newValue) => this.handleSliderChange(e, newValue)}
                aria-labelledby="input-slider"
              />
            </ThemeProvider>
            ${this.state.betAmount}
            <div
              className="PlayOption BetButton"
              onClick={() =>
                this.performAction({
                  actionType: 'bet',
                  betAmount: parseFloat(this.state.betAmount),
                })
              }
            >
              BET
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
