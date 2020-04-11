import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';
import Deck from '../classes/Deck';
import { BettingRound, PlayerStatus } from '../constants';

export const defaultPlayer: IPlayer = {
  id: 0,
  socketId: '',
  name: 'name',
  currentBet: 0,
  chipCount: 200,
  pocket: [],
  isActiveInRound: true,
  status: PlayerStatus.default,
};

export const defaultRound: IRound = {
  board: [],
  pots: [{ isOpen: true, size: 0, eligibleWinners: new Set() }],
  highestBet: 0,
  currentPlayer: 0,
  stoppingPoint: 2,
  deck: new Deck(),
  playersFolded: [],
  playersAllIn: [],
  bettingRound: BettingRound.preFlop,
  isActive: false,
  winners: {
    ids: [],
    desc: '',
  },
};
