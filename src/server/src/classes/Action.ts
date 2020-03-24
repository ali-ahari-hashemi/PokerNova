import { ActionType } from "../constants";
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
      case ActionType.bet:
        this.bet();
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
    this.placeBet(callAmount);
  }

  raise() {
    const callAmount = this.round.highestBet - this.player.currentBet;
    const raiseAmount = this.action.betAmount;
    const totalRaiseAmount = callAmount + (raiseAmount as number);

    if (totalRaiseAmount >= this.player.chipCount) {
      this.allIn();
    } else {
      console.log(`player ${this.player.id} raising amount: ${totalRaiseAmount}`);
      this.placeBet(totalRaiseAmount);
    }
  }

  allIn() {
    console.log(`player ${this.player.id} going all in`);
    this.placeBet(this.player.chipCount);
    this.round.playersAllIn.push(this.player.id);
  }

  // First to bet (highest current bet == 0)
  bet() {
    const betAmount = this.action.betAmount as number;
    if (betAmount > 0) {
      if (betAmount < this.player.chipCount) {
        this.round.highestBet = betAmount;
        this.round.stoppingPoint = this.player.id;
        console.log(`player ${this.player.id} betting ${betAmount}`);
      } else {
        this.allIn();
      }
    } else {
      this.check();
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
