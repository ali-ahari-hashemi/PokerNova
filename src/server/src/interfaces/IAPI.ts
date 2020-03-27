import { IAction } from './IAction';
import { gameId } from '../app';

export interface IPerformActionAPI {
  action: IAction;
  gameId: gameId;
  playerId: number;
}
