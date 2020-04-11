import { ActionType, PlayerStatus } from '../constants';
import { IAction } from '../interfaces/IAction';
import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';
import Logger from '../utilities/Logger';

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
      case ActionType.blind:
        return this.blind();
      default:
        return this.fold();
    }
  }

  fold(): boolean {
    Logger.log(`player ${this.player.id} folding`);
    this.round.playersFolded.push(this.player.id);
    this.player.isActiveInRound = false;
    this.player.status = PlayerStatus.folded;
    return true;
  }

  check(): boolean {
    Logger.log(`player ${this.player.id} checking`);
    const callAmount = this.round.highestBet - this.player.currentBet;
    this.player.status = PlayerStatus.checked;
    return callAmount == 0;
  }

  bet(): boolean {
    const betAmount = this.action.betAmount as number;
    const callAmount = this.round.highestBet - this.player.currentBet;

    // Player attempts to bet an invalid amount - fail
    if (betAmount <= 0 || betAmount > this.player.chipCount) {
      return false;

      // Player attempts to bet their entire balance - pass, player goes all in
    } else if (betAmount == this.player.chipCount) {
      return this.allIn();

      // Player attempts to bet less than the amount needed to call - fail
    } else if (betAmount < callAmount) {
      return false;

      // Player attempts to bet a valid amount - pass, process bet
    } else if (betAmount > 0) {
      if (betAmount == callAmount) {
        return this.call();
      } else {
        Logger.log(`player ${this.player.id} betting amount: ${betAmount}`);
        this.player.status = this.round.highestBet > 0 ? PlayerStatus.raise : PlayerStatus.bet;
        this.placeBet(betAmount);
        return true;
      }
    } else {
      return false;
    }
  }

  blind(): boolean {
    this.placeBet(this.action.betAmount || 0, true);
    return true;
  }

  private call(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet;
    Logger.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.player.status = `${PlayerStatus.called}`;
    this.placeBet(callAmount);
    return true;
  }

  private allIn(): boolean {
    Logger.log(`player ${this.player.id} going all in`);
    this.player.status = PlayerStatus.allIn;
    this.placeBet(this.player.chipCount);
    this.round.playersAllIn.push(this.player.id);
    return true;
  }

  private placeBet(betAmount: number, isBlind: boolean = false): void {
    this.round.pot += betAmount;
    this.player.chipCount -= betAmount;
    const playersCurrentTotalBet = this.player.currentBet + betAmount;
    this.player.currentBet = playersCurrentTotalBet;

    if (playersCurrentTotalBet > this.round.highestBet) {
      this.round.highestBet = playersCurrentTotalBet;
      if (!isBlind) {
        this.round.stoppingPoint = this.player.id;
      }
    }
  }
}
