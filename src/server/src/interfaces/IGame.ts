import { IPlayer } from './IPlayer';

export default interface IGame {
  id: string;
  pin: string;
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
}
