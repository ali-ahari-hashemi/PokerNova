import React from 'react';
import PieTimer from '../components/PieTimer';
import Card from '../components/Card';
import PlayerModule from '../components/PlayerModule';
import { RANKS, SUITS } from '../utilities/constants';
import { getSeatStyles } from '../utilities/utilities';
import './Game.css';

// Maps something like 'Qc' to something like { rank: RANKS.QUEEN, suit: SUITS.CLUB }
const mapAPICardToUICard = (card) => {
  const apiRank = card[0];
  const apiSuit = card[1];

  let uiRank;
  let uiSuit;

  switch (apiRank) {
    case 'A':
      uiRank = RANKS.ACE;
      break;
    case '2':
      uiRank = RANKS.TWO;
      break;
    case '3':
      uiRank = RANKS.THREE;
      break;
    case '4':
      uiRank = RANKS.FOUR;
      break;
    case '5':
      uiRank = RANKS.FIVE;
      break;
    case '6':
      uiRank = RANKS.SIX;
      break;
    case '7':
      uiRank = RANKS.SEVEN;
      break;
    case '8':
      uiRank = RANKS.EIGHT;
      break;
    case '9':
      uiRank = RANKS.NINE;
      break;
    case 'T':
      uiRank = RANKS.TEN;
      break;
    case 'J':
      uiRank = RANKS.JACK;
      break;
    case 'Q':
      uiRank = RANKS.QUEEN;
      break;
    case 'K':
      uiRank = RANKS.KING;
      break;
    default:
      throw new Error('Major mistake with mapAPICardToUICard');
  }

  switch (apiSuit) {
    case 'c':
      uiSuit = SUITS.CLUBS;
      break;
    case 'd':
      uiSuit = SUITS.DIAMONDS;
      break;
    case 'h':
      uiSuit = SUITS.HEARTS;
      break;
    case 's':
      uiSuit = SUITS.SPADES;
      break;
    default:
      throw new Error('Major mistake with mapAPICardToUICard');
  }

  return {
    rank: uiRank,
    suit: uiSuit,
  }
}

// TODO: how are we gonna actually get this data?
// We could hash the ip address and make that the player's id
// might make testing hard, but cookies would also make testing hard
const userPlayerID = 0;

const getBettingRoundTextFromData = (bettingRound) => {
  switch (bettingRound) {
    case 'preFlop':
      return 'The Pre-Flop';
    case 'flop':
      return 'The Flop';
    case 'turn':
      return 'The Turn';
    case 'river':
      return 'The River';
    default:
      return 'Error';
  }
}

const getPlayerModulesFromData = (data) => {
  const players = data.players;

  return players.filter(item => item.id !== userPlayerID).map(player => {
    return {
      player: player.name,
      status: 'Status TBD',
      total: player.chipCount,
      active: player.id === data.currentRound.round.currentPlayer
    }
  });
}

const getUserModuleFromData = (data) => {
  const players = data.players;
  const user = players.find(item => item.id === userPlayerID);

  return {
    player: user.name,
    status: 'Status TBD',
    total: user.chipCount,
    active: user.id === data.currentRound.round.currentPlayer
  }
}

const getUserCardsFromData = (data) => {
  const players = data.players;
  const user = players.find(item => item.id === userPlayerID);
  return [
    mapAPICardToUICard(user.pocket[0]),
    mapAPICardToUICard(user.pocket[1]),
  ];
}

const mapAPIDataToUIState = (data) => {
  return {
    statusText: "Status feature is TBD", // TBD
    timerTimeLeft: 0, // TBD
    timerTotalTime: 0, // TBD
    bettingRoundText: getBettingRoundTextFromData(data.currentRound.round.bettingRound),
    boardCards: [], // TBD, will come from data.currentRound.round.board
    potTotal: data.currentRound.round.pot,
    playerModules: getPlayerModulesFromData(data),
    userModule: getUserModuleFromData(data),
    userCards: getUserCardsFromData(data)
  }
}

// TODO: set up ordering such that the UI order coincides with the order of the round, regardless of which player index is the current user
class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusText: "",
      timerTimeLeft: 0,
      timerTotalTime: 0,
      bettingRoundText: '',
      boardCards: [],
      potTotal: 0,
      playerModules: [],
      userModule: {
        player: '',
        status: '',
        total: 0,
        active: false,
      },
      userCards: []
    }
  }

  componentDidMount() {
    const { gameId, setErrorPage } = this.props;

    fetch(`/api/game/${gameId}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          setErrorPage('There was an error fetching game data :(');
        } else {
          throw new Error();
        }
      })
      .then((myJson) => {
        if (myJson) {
          const apiGameState = myJson.gameState;
          console.log(apiGameState);
          const newUIState = mapAPIDataToUIState(apiGameState);
          this.setState(newUIState);
        }
      })
      .catch((err) => {
        setErrorPage('There was an error fetching game data :(');
      });
  }

  renderBoardCards() {
    const { boardCards } = this.state;

    const populatedCards = boardCards.map((card, i) => {
      return (
        <Card
          key={`populated-card-${i}`}
          rank={card.rank}
          suit={card.suit}
        />
      );
    });

    const numEmptyCards = 5 - boardCards.length;

    const emptyCards = Array(numEmptyCards).fill().map((item, i) => {
      return (
        <Card
          key={`empty-card-${i}`}
          rank=""
          suit=""
        />
      );
    })

    return populatedCards.concat(emptyCards);
  }

  renderUserCards() {
    const { userCards } = this.state;

    const populatedCards = userCards.map((card, i) => {
      return (
        <Card
          key={`populated-card-${i}`}
          rank={card.rank}
          suit={card.suit}
        />
      );
    });

    const numEmptyCards = 2 - userCards.length;

    const emptyCards = Array(numEmptyCards).fill().map((item, i) => {
      return (
        <Card
          key={`empty-card-${i}`}
          rank=""
          suit=""
        />
      );
    })

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
    })
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
              <PieTimer
                current={timerTimeLeft}
                total={timerTotalTime}
              />
            </div>
          </div>
          <div className="spacer" />
        </div>
        <div className="GameTable">
          <p className="BettingRoundText">{bettingRoundText}</p>
          <div className="BoardCardsContainer">
            {this.renderBoardCards()}
          </div>
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
            <div className="UserCardsContainer">
              {this.renderUserCards()}
            </div>
          </div>
          <div className="UserContentOptionsContainer">
            <div className="UserContentOptionsHeader">
              <p className="UserContentOptionsTitle">Options</p>
            </div>
            <div className="UserContentOptionsContent">
              <div className="BetContainer">
                <div className="PlayOption BetButton">BET</div>
                <div className="PlayOption BetAmount">$2</div> { /* This should be a slider or something */}
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

