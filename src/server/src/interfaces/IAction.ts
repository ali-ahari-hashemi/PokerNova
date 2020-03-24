import { ActionType } from "../enums";

export interface IAction {
  actionType: ActionType;
  betAmount?: number;
}
