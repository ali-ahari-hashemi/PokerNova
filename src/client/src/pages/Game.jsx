import React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PieTimer from '../components/PieTimer';
import Card from '../components/Card';
import PlayerModule from '../components/PlayerModule';
import './Game.css';

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
      betAmount: 0,
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

  renderBoardCards() {
    const { boardCards } = this.props;
    const numEmptyCards = 5 - boardCards.length;

    const populatedCards = boardCards.map((card, i) => {
      return <Card key={`populated-card-${i}`} rank={card.rank} suit={card.suit} />;
    });
    const emptyCards = Array(numEmptyCards)
      .fill()
      .map((item, i) => {
        return <Card key={`empty-card-${i}`} empty={true} />;
      });

    return populatedCards.concat(emptyCards);
  }

  renderPlayerModules(playerIds) {
    const { playerModules } = this.props;

    return playerModules.map((item, index) => {
      if (playerIds.includes(item.id)) {
        const isOnTopOrBottom = [0, 1, 4, 5].includes(item.id);
        return (
          <div
            key={index}
            style={isOnTopOrBottom ? { padding: '0px 40px' } : { padding: '20px 0px' }}
          >
            <PlayerModule {...item} />
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
      userModule,
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
          <div id="TopSteats" className="SeatsHotizontal">
            {this.renderPlayerModules([0, 1])}
          </div>
          <div className="Row">
            <div id="LeftSteats" className="SeatsVertical">
              {this.renderPlayerModules([6, 7])}
            </div>

            <div className="GameTable">
              <p className="BettingRoundText">{bettingRoundText}</p>
              <div className="BoardCardsContainer">{this.renderBoardCards()}</div>
              <p className="PotTotalText">Total Pot: ${potTotal}</p>
            </div>

            <div id="RightSteats" className="SeatsVertical">
              {this.renderPlayerModules([2, 3])}
            </div>
          </div>

          <div id="BottomSteats" className="SeatsHotizontal">
            {this.renderPlayerModules([4, 5])}
          </div>
        </div>
        <div className="UserContent">
          <div className="UserContentOptionsContent">
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
            <div className="BetContainer">
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
          <div className="BetSlider">
            <ThemeProvider theme={muiTheme}>
              <Slider
                className="Slider"
                value={typeof this.state.betAmount === 'number' ? this.state.betAmount : 0}
                onChange={(e, newValue) => this.handleSliderChange(e, newValue)}
                aria-labelledby="input-slider"
              />
            </ThemeProvider>
            ${this.state.betAmount}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
