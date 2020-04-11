import { playerId, BettingRound } from '../constants';
import { IPlayer } from './IPlayer';
import { IHandWinners } from '../utilities/CardHelpers';

export interface IPlayerState {
  id: number;
  name: string;
}

export interface IRoundStateToSend {
  board: string[];
  pot: number;
  highestBet: number;
  currentPlayer: number;
  playersFolded: number[];
  playersAllIn: number[];
  bettingRound?: BettingRound; // undefined before the first round
  isActive: boolean;
  winners: IHandWinners;
}

export default interface IGameStateToSend {
  id: string;
  isActive: boolean;
  currentDealer: number;
  players: IPlayer[];
  currentRound: IRoundStateToSend;
}
