import { ActionType } from "../constants";

export interface IAction {
  actionType: ActionType;
  betAmount?: number;
}
