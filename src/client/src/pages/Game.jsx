import React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PieTimer from '../components/PieTimer';
import PlayerModule from '../components/PlayerModule';
import './Game.css';
import { getLocation } from '../utilities/getLocation';
import Chips from '../components/Chips';
import GameTable from '../components/GameTable';
import PlayerList from '../components/PlayersList';

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

  renderPlayerModules(playerIds) {
    const { playerModules } = this.props;

    return playerModules.map((item, index) => {
      if (playerIds.includes(parseInt(item.id))) {
        const location = getLocation(item.id);
        const hasABet = item.currentBet > 0;
        return (
          <div
            key={index}
            style={
              location == 'top' || location == 'bottom'
                ? { padding: '0px 40px' }
                : { padding: '0px' }
            }
          >
            <div className="ModuleAndChipsHorizontal">
              {location == 'right' && hasABet && (
                <Chips amount={item.currentBet} location="Right" />
              )}
              <div className="ModuleAndChipsVertical">
                {location == 'bottom' && hasABet && (
                  <Chips amount={item.currentBet} location="Bottom" />
                )}
                <PlayerModule {...item} />
                {location == 'top' && hasABet && <Chips amount={item.currentBet} location="Top" />}
              </div>
              {location == 'left' && hasABet && <Chips amount={item.currentBet} location="Left" />}
            </div>
          </div>
        );
      }
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
      bettingRoundText,
      potTotal,
      callAmount,
      allInAmount,
    } = this.props;

    return (
      <div className="Game">
        <p className="AppLogo">PokerNova&#8482;</p>
        <div className="Header">
          <div className="HeaderStatus">
            <p className="HeaderStatusText">{statusText}</p>
            <div className="TimerContainer">
              <PieTimer current={timerTimeLeft} total={timerTotalTime} />
            </div>
          </div>
          <div className="spacer" />
        </div>
        <div className="GameTableContainer">
          <PlayerList location="top" playerIds={[0, 1]} playerModules={this.props.playerModules} />
          <div className="Row">
            <PlayerList
              location="left"
              playerIds={[6, 7]}
              playerModules={this.props.playerModules}
            />

            <GameTable
              bettingRound={bettingRoundText}
              potTotal={potTotal}
              boardCards={this.props.boardCards}
            />
            <PlayerList
              location="right"
              playerIds={[2, 3]}
              playerModules={this.props.playerModules}
            />
          </div>
          <PlayerList
            location="bottom"
            playerIds={[4, 5]}
            playerModules={this.props.playerModules}
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
