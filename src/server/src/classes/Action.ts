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
      case ActionType.check:
        return this.check();
      case ActionType.bet:
        return this.bet();
      default:
        return this.fold();
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
    const callAmount = this.round.highestBet - this.player.currentBet;
    return callAmount == 0;
  }

  bet(): boolean {
    const betAmount = this.action.betAmount as number;
    const callAmount = this.round.highestBet - this.player.currentBet;

    if (betAmount > this.player.chipCount) {
      return false;
    } else if (betAmount == this.player.chipCount) {
      return this.allIn();
    } else if (betAmount < callAmount) {
      return false;
    } else if (betAmount < 0) {
      return false;
    } else if (betAmount == 0) {
      return false;
    } else if (betAmount > 0) {
      if (betAmount == callAmount) {
        return this.call();
      } else {
        if (callAmount <= 0) {
          console.log(`player ${this.player.id} betting amount: ${betAmount}`);
          this.placeBet(betAmount);
          return true;
        } else {
          return this.raise();
        }
      }
    } else {
      return false;
    }
  }

  private call(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet;
    console.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.placeBet(callAmount);
    return true;
  }

  private raise(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet; // 100
    const betAmount = this.action.betAmount as number;
    const totalRaiseAmount = betAmount - callAmount;

    console.log(`player ${this.player.id} raising amount: ${totalRaiseAmount}`);
    this.placeBet(betAmount);
    return true;
  }

  private allIn(): boolean {
    console.log(`player ${this.player.id} going all in`);
    this.placeBet(this.player.chipCount);
    this.round.playersAllIn.push(this.player.id);
    return true;
  }

  private placeBet(betAmount: number): void {
    this.round.pot += betAmount;
    this.player.chipCount -= betAmount;
    const playersCurrentTotalBet = this.player.currentBet + betAmount;
    this.player.currentBet = playersCurrentTotalBet;

    if (playersCurrentTotalBet > this.round.highestBet) {
      this.round.highestBet = playersCurrentTotalBet;
      this.round.stoppingPoint = this.player.id;
    }
  }
}
