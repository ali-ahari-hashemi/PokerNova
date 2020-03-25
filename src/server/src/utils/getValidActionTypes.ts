import { ActionType } from '../constants';
import { IPlayer } from '../interfaces/IPlayer';

export const getValidActionTypes = (player: IPlayer, highestBet: number): ActionType[] => {
  const validActions = [ActionType.fold, ActionType.bet]; // player can always fold or go allIn (bet all chips) on any hand
  player.currentBet == highestBet && validActions.push(ActionType.check);
  return validActions;
};
