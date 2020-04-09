import React from 'react';
import PieTimer from '../components/PieTimer';
import Card from '../components/Card';
import PlayerModule from '../components/PlayerModule';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <div className="UserContentOptionsContainer">
            <div className="UserContentOptionsHeader">
              <p className="UserContentOptionsTitle">Options</p>
            </div>
            <div className="UserContentOptionsContent">
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
                <div className="BetAmount">
                  $
                  <input
                    className="WaitingRoomInput"
                    type="text"
                    value={this.state.betAmount}
                    onChange={(e) => {
                      this.setState({ betAmount: e.target.value });
                    }}
                  />
                </div>{' '}
                {/* This should be a slider or something */}
              </div>
              <div
                className="PlayOption PlayOptionFull CheckButton"
                onClick={() =>
                  this.performAction({
                    actionType: 'check',
                  })
                }
              >
                CHECK
              </div>
              <div
                className="PlayOption PlayOptionFull FoldButton"
                onClick={() =>
                  this.performAction({
                    actionType: 'fold',
                  })
                }
              >
                FOLD
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
