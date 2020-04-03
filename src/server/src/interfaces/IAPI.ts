import { IAction } from './IAction';
import { gameId } from '../constants';

export interface IPerformActionAPI {
  action: IAction;
  gameId: gameId;
  playerId: number;
}

export interface IJoinGameAPI {
  gameId: gameId;
  name: string;
}

export interface IStartGameAPI {
  id: gameId;
  pin: string;
}

export interface ICreateGameAPI {
  pin: string;
}
