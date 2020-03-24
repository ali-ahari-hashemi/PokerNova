import { ActionType } from "../constants";
import { IPlayer } from "../interfaces/IPlayer";

export const getValidActionTypes = (
  player: IPlayer,
  highestBet: number
): ActionType[] => {
  const validActions = [ActionType.fold, ActionType.allIn]; // player can always fold or go allIn on any hand
  const callAmount = highestBet - player.currentBet; // amount needed to call current highest bet

  player.currentBet == highestBet && validActions.push(ActionType.check);
  callAmount !== 0 && player.chipCount > callAmount && validActions.push(ActionType.call);
  highestBet == 0 && player.chipCount > 0 && validActions.push(ActionType.bet);
  highestBet !== 0 &&
    player.chipCount > callAmount &&
    validActions.push(ActionType.raise);

  return validActions;
};
