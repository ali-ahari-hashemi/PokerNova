import { RANKS, SUITS } from './constants';

export const mapAPIDataToUIState = (data, userPlayerID) => {
  console.log('mapping func', data);
  return {
    statusText: `Current Heighest Bet: $${data.currentRound.highestBet}`, // TBD
    timerTimeLeft: 0, // TBD
    timerTotalTime: 0, // TBD
    bettingRoundText: getBettingRoundTextFromData(data.currentRound.bettingRound),
    boardCards: data.currentRound.board.map((card) => mapAPICardToUICard(card)),
    potTotal: data.currentRound.pot,
    playerModules: getPlayerModulesFromData(data, userPlayerID),
    callAmount: data.currentRound.highestBet - data.players[userPlayerID].currentBet,
    allInAmount: data.players[userPlayerID].chipCount,
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
  return data.players.map((player) => {
    const pocket =
      player.pocket.length > 0 ? player.pocket.map((card) => mapAPICardToUICard(card)) : [{}, {}];
    return {
      id: player.id,
      player: player.name,
      status: player.status,
      total: player.chipCount,
      active: player.id === data.currentRound.currentPlayer,
      isCurrentPlayer: player.id == userPlayerID,
      pocket: pocket,
      currentBet: player.currentBet,
      isWinner: data.currentRound.winners.ids.includes(player.id),
    };
  });
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
