import Deck from "../classes/Deck";

export interface IRound {
  board: string[];
  pot: number;
  highestBet: number;
  currentPlayer: number;
  stoppingPoint: number;
  deck: Deck;
  playersFolded: number[];
  playersAllIn: number[];
}
