import { IAction } from './IAction';
import { gameId } from '../constants';
import IGameStateToSend from './IGameStateToSend';

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
}

export interface ICreateGameAPI {
  pin: string;
}

export interface IStateUpdated {
  gameState: IGameStateToSend;
}
