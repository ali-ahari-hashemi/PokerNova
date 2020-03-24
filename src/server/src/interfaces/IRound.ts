import Deck from "../classes/Deck";

export interface IRound {
  board: number[];
  pot: number;
  highestBet: number;
  currentPlayer: number;
  stoppingPoint: number;
  deck: Deck;
  playersFolded: number[];
  playersAllIn: number[];
}
