import { IPlayer } from "./IPlayer";

export default interface IGame {
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
}
