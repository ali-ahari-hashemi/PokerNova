import { IPlayer } from './IPlayer';

export default interface IGame {
  id: string;
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
}
