import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';
import Deck from '../classes/Deck';
import { BettingRound, PlayerStatus } from '../constants';

export const defaultPlayer: IPlayer = {
  id: 0,
  name: 'name',
  currentBet: 0,
  chipCount: 200,
  pocket: [],
  isActiveInRound: true,
  status: PlayerStatus.default,
};

export const defaultRound: IRound = {
  board: [],
  pot: 0,
  highestBet: 0,
  currentPlayer: 0,
  stoppingPoint: 2,
  deck: new Deck(),
  playersFolded: [],
  playersAllIn: [],
  bettingRound: BettingRound.preFlop,
  isActive: false,
};
