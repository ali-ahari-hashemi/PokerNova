import Deck from '../classes/Deck';
import { BettingRound } from '../constants';
import { IHandWinners } from '../utilities/CardHelpers';

export interface IRound {
  board: string[];
  pot: number;
  highestBet: number;
  currentPlayer: number;
  stoppingPoint: number;
  deck: Deck;
  playersFolded: number[];
  playersAllIn: number[];
  bettingRound?: BettingRound; // undefined before the first round
  isActive: boolean;
  winners: IHandWinners;
}
