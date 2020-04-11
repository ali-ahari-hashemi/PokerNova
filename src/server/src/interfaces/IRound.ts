import Deck from '../classes/Deck';
import { BettingRound } from '../constants';
import { IHandWinners } from '../utilities/CardHelpers';

export interface IPot {
  allInState?: {
    amount: number;
    player: number;
  };
  isOpen: boolean;
  size: number;
  eligibleWinners: Set<number>;
}

export interface IRound {
  board: string[];
  pots: IPot[];
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
