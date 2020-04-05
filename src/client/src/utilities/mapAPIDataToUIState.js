import { RANKS, SUITS } from './constants';

export const mapAPIDataToUIState = (data, userPlayerID) => {
  console.log('DATA mapping func', data);
  return {
    statusText: 'Status feature is TBD', // TBD
    timerTimeLeft: 0, // TBD
    timerTotalTime: 0, // TBD
    bettingRoundText: getBettingRoundTextFromData(data.currentRound.bettingRound),
    boardCards: data.currentRound.board,
    potTotal: data.currentRound.pot,
    playerModules: getPlayerModulesFromData(data, userPlayerID),
    userModule: getUserModuleFromData(data, userPlayerID),
    userCards: getUserCardsFromData(data, userPlayerID),
  };
};

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
};

const getPlayerModulesFromData = (data, userPlayerID) => {
  const players = data.players;
  const startIndex = players.findIndex((item) => item.id === userPlayerID);
  const orderedPlayers = [];
  for (let i = 0; i < players.length; i++) {
    const index = (i + startIndex) % players.length;
    players[index].id !== userPlayerID && orderedPlayers.push(players[index]);
  }

  return orderedPlayers.map((player) => ({
    player: player.name,
    status: 'Status TBD',
    total: player.chipCount,
    active: player.id === data.currentRound.currentPlayer,
  }));
};

const getUserModuleFromData = (data, userPlayerID) => {
  const players = data.players;
  const user = players.find((item) => item.id === userPlayerID);

  return {
    player: user.name,
    status: 'Status TBD',
    total: user.chipCount,
    active: user.id === data.currentRound.currentPlayer,
  };
};

const getUserCardsFromData = (data, userPlayerID) => {
  const players = data.players;
  const user = players.find((item) => item.id === userPlayerID);
  return [mapAPICardToUICard(user.pocket[0]), mapAPICardToUICard(user.pocket[1])];
};

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
  };
};
