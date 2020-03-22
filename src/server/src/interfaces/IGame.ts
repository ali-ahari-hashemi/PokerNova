import { IPlayer } from "./IPlayer";

export default interface IGame {
  isActive: boolean;
  board: number[];
  pot: number;
  highestBet: number;
  currentPlayer: number;
  currentDealer: number;
  players: IPlayer[];
}
