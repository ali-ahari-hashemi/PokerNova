import { IPlayer } from './IPlayer';
import Round from '../classes/Round';

export default interface IGame {
  id: string;
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
  currentRound: Round;
}
