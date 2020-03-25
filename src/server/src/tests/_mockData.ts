import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';
import Deck from '../classes/Deck';

export const defaultPlayer: IPlayer = {
  id: 0,
  name: 'name',
  currentBet: 0,
  chipCount: 200,
  pocket: [],
  isActiveInRound: true,
};

export const defaultRound: IRound = {
  board: [],
  pot: 0,
  highestBet: 0,
  currentPlayer: 0,
  stoppingPoint: 1,
  deck: new Deck(),
  playersFolded: [],
  playersAllIn: [],
};
