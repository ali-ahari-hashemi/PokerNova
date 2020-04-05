import React from 'react';
import PieTimer from '../components/PieTimer';
import Card from '../components/Card';
import PlayerModule from '../components/PlayerModule';
import { getSeatStyles } from '../utilities/utilities';
import './Game.css';
import { mapAPIDataToUIState } from '../utilities/mapAPIDataToUIState';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = mapAPIDataToUIState(props.gameState, this.props.seat);
  }

  renderBoardCards() {
    const { boardCards } = this.state;
    const numEmptyCards = 5 - boardCards.length;

    const populatedCards = boardCards.map((card, i) => {
      return <Card key={`populated-card-${i}`} rank={card.rank} suit={card.suit} />;
    });
    const emptyCards = Array(numEmptyCards)
      .fill()
      .map((item, i) => {
        return <Card key={`empty-card-${i}`} rank="" suit="" />;
      });

    return populatedCards.concat(emptyCards);
  }

  renderUserCards() {
    const { userCards } = this.state;
    const numEmptyCards = 2 - userCards.length;

    const populatedCards = userCards.map((card, i) => {
      return <Card key={`populated-card-${i}`} rank={card.rank} suit={card.suit} />;
    });

    const emptyCards = Array(numEmptyCards)
      .fill()
      .map((item, i) => {
        return <Card key={`empty-card-${i}`} rank="" suit="" />;
      });

    return populatedCards.concat(emptyCards);
  }

  renderPlayerModules() {
    const { playerModules } = this.state;
    const seatStyles = getSeatStyles(playerModules.length);

    return playerModules.map((item, index) => {
      return (
        <div key={index} style={seatStyles[index]}>
          <PlayerModule
            player={item.player}
            status={item.status}
            total={item.total}
            active={item.active}
          />
        </div>
      );
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
    } = this.state;

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
        <div className="GameTable">
          <p className="BettingRoundText">{bettingRoundText}</p>
          <div className="BoardCardsContainer">{this.renderBoardCards()}</div>
          <p className="PotTotalText">Total Pot: ${potTotal}</p>
          {this.renderPlayerModules()}
        </div>
        <div className="UserContent">
          <div className="UserContentStatusContainer">
            <PlayerModule
              player={userModule.player}
              status={userModule.status}
              total={userModule.total}
              active={userModule.active}
            />
            <div className="UserCardsContainer">{this.renderUserCards()}</div>
          </div>
          <div className="UserContentOptionsContainer">
            <div className="UserContentOptionsHeader">
              <p className="UserContentOptionsTitle">Options</p>
            </div>
            <div className="UserContentOptionsContent">
              <div className="BetContainer">
                <div className="PlayOption BetButton">BET</div>
                <div className="PlayOption BetAmount">$2</div>{' '}
                {/* This should be a slider or something */}
              </div>
              <div className="PlayOption PlayOptionFull CheckButton">CHECK</div>
              <div className="PlayOption PlayOptionFull FoldButton">FOLD</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
