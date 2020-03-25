import { ActionType } from '../constants';
import { IAction } from '../interfaces/IAction';
import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';

interface IParams {
  action: IAction;
  player: IPlayer;
  round: IRound;
}

/** Action:
 *  - Performs any poker action
 *  - Updates player & round state accordingly
 */

export class Action {
  private action: IAction;
  private player: IPlayer;
  private round: IRound;

  constructor(params: IParams) {
    this.action = params.action;
    this.player = params.player;
    this.round = params.round;
  }

  performAction(): boolean {
    switch (this.action.actionType as ActionType) {
      case ActionType.fold:
        return this.fold();
        break;
      case ActionType.check:
        return this.check();
        break;
      case ActionType.call:
        return this.call();
        break;
      case ActionType.raise:
        return this.raise();
        break;
      case ActionType.allIn:
        return this.allIn();
        break;
      case ActionType.bet:
        return this.bet();
        break;
      default:
        return this.fold();
        break;
    }
  }

  fold(): boolean {
    console.log(`player ${this.player.id} folding`);
    this.round.playersFolded.push(this.player.id);
    this.player.isActiveInRound = false;
    return true;
  }

  check(): boolean {
    console.log(`player ${this.player.id} checking`);
    return true;
  }

  call(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet;
    console.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.placeBet(callAmount);
    return true;
  }

  raise(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet;
    const raiseAmount = this.action.betAmount;
    const totalRaiseAmount = callAmount + (raiseAmount as number);

    if (totalRaiseAmount >= this.player.chipCount) {
      this.allIn();
    } else {
      console.log(`player ${this.player.id} raising amount: ${totalRaiseAmount}`);
      this.placeBet(totalRaiseAmount);
    }
    return true;
  }

  allIn(): boolean {
    console.log(`player ${this.player.id} going all in`);
    this.placeBet(this.player.chipCount);
    this.round.playersAllIn.push(this.player.id);
    return true;
  }

  // First to bet (highest current bet == 0)
  bet(): boolean {
    const betAmount = this.action.betAmount as number;
    if (betAmount > 0) {
      if (betAmount < this.player.chipCount) {
        this.round.highestBet = betAmount;
        this.round.stoppingPoint = this.player.id;
        console.log(`player ${this.player.id} betting ${betAmount}`);
        return true;
      } else {
        return this.allIn();
      }
    } else {
      return this.check();
    }
  }

  private placeBet(betAmount: number) {
    this.round.pot += betAmount;
    this.player.chipCount -= betAmount;
    const playersCurrentTotalBet = this.player.currentBet + betAmount;

    if (playersCurrentTotalBet > this.round.highestBet) {
      this.round.highestBet = playersCurrentTotalBet;
      this.round.stoppingPoint = this.player.id;
    }
  }
}
