import { ActionType } from "../enums";
import { IAction } from "../interfaces/IAction";
import { IPlayer } from "../interfaces/IPlayer";
import { IRound } from "../interfaces/IRound";

/** Action:
 *  - Performs any poker action
 *  - Updates player & round state accordingly
 */

export class Action {
  private action: IAction;
  private player: IPlayer;
  private round: IRound;

  constructor(action: IAction, player: IPlayer, round: IRound) {
    this.action = action;
    this.player = player;
    this.round = round;
  }

  performAction() {
    switch (this.action.actionType as ActionType) {
      case ActionType.fold:
        this.fold();
        break;
      case ActionType.check:
        this.check();
        break;
      case ActionType.call:
        this.call();
        break;
      case ActionType.raise:
        this.raise();
        break;
      case ActionType.allIn:
        this.allIn();
        break;
      default:
        this.fold();
        break;
    }
  }

  fold() {
    console.log(`player ${this.player.id} folding`);
    this.round.playersFolded.push(this.player.id);
    this.player.isActiveInRound = false;
  }

  check() {
    console.log(`player ${this.player.id} checking`);
  }

  call() {
    const callAmount = this.round.highestBet - this.player.currentBet;
    console.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.bet(callAmount);
  }

  raise() {
    const callAmount = this.round.highestBet - this.player.currentBet;
    const raiseAmount = this.action.betAmount;
    const totalRaiseAmount = callAmount + (raiseAmount as number);

    if (totalRaiseAmount >= this.player.chipCount) {
      this.allIn();
    } else {
      console.log(`player ${this.player.id} raising amount: ${totalRaiseAmount}`);
      this.bet(totalRaiseAmount);
    }
  }

  allIn() {
    console.log(`player ${this.player.id} going all in`);
    this.bet(this.player.chipCount);
    this.round.playersAllIn.push(this.player.id);
  }

  private bet(betAmount: number) {
    this.round.pot += betAmount;
    this.player.chipCount -= betAmount;
    const playersCurrentTotalBet = this.player.currentBet + betAmount;

    if (playersCurrentTotalBet > this.round.highestBet) {
      this.round.highestBet = playersCurrentTotalBet;
      this.round.stoppingPoint = this.player.id;
    }
  }
}
