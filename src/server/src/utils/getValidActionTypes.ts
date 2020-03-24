import { ActionType } from "../enums";
import { IPlayer } from "../interfaces/IPlayer";

export const getValidActionTypes = (
  player: IPlayer,
  highestBet: number
): ActionType[] => {
  const validActions = [ActionType.fold, ActionType.allIn]; // player can always fold or go allIn on any hand
  const callAmount = highestBet - player.currentBet; // amount needed to call current highest bet

  player.currentBet == highestBet && validActions.push(ActionType.check);
  callAmount !== 0 && player.chipCount > callAmount && validActions.push(ActionType.call);
  player.chipCount > callAmount && validActions.push(ActionType.raise);

  return validActions;
};
