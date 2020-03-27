import { IPlayer } from './IPlayer';
import Round from '../classes/Round';

export default interface IGame {
  id: string;
  pin: string;
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
  currentRound: Round;
}
