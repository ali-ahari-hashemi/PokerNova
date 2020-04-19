import React from 'react';
import './Game.css';
import GameTableWithPlayers from '../components/GameTableWithPlayers';
import UserControls from '../components/UserControls';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: this.props.callAmount, // Min bet amount
    };
  }

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
      gameId,
      seat,
      highestBet,
      currentBet,
    } = this.props;

    return (
      <div className="Game">
        <p className="AppLogo">PokerNova&#8482;</p>
        <div className="middleContainer">
          <div className="middleAspectRatio">
            <div className="fill">
              <GameTableWithPlayers
                potTotal={potTotal}
                boardCards={boardCards}
                playerModules={playerModules}
              />
            </div>
          </div>
        </div>

        <UserControls
          currentBet={currentBet}
          callAmount={callAmount}
          allInAmount={allInAmount}
          heighestBet={highestBet}
          gameId={gameId}
          playerId={seat}
        />
      </div>
    );
  }
}

export default Game;
