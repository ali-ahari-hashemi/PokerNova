import { IRound } from "../interfaces/IRound";
import { IPlayer } from "../interfaces/IPlayer";

interface IParams {
  currentDealer: number;
  players: IPlayer[];
}

/**
 * Round:
 * -  Holds and manages Round state
 * -  Handles actions made by players within a round
 */
export default class Round {
  constructor(params: IParams) {}
}
