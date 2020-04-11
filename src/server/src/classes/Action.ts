import { ActionType, PlayerStatus } from '../constants';
import { IAction } from '../interfaces/IAction';
import { IPlayer } from '../interfaces/IPlayer';
import { IRound } from '../interfaces/IRound';
import _ from 'lodash';

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
    console.log(`player ${this.player.id} folding`);
    this.round.playersFolded.push(this.player.id);
    this.player.isActiveInRound = false;
    this.player.status = PlayerStatus.folded;
    return true;
  }

  check(): boolean {
    console.log(`player ${this.player.id} checking`);
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
        console.log(`player ${this.player.id} betting amount: ${betAmount}`);
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
    console.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.player.status = `${PlayerStatus.called}`;
    this.placeBet(callAmount);
    return true;
  }

  private allIn(): boolean {
    console.log(`player ${this.player.id} going all in`);
    this.player.status = PlayerStatus.allIn;
    this.round.playersAllIn.push(this.player.id);

    this.placeBet(this.player.chipCount);

    // Update currently active pot to allIn status
    const currPot = this.round.pots[this.round.pots.length - 1];
    currPot.allInState = { amount: this.player.chipCount, player: this.player.id };

    // Create new side pot
    this.round.pots.push({ isOpen: true, size: 0, eligibleWinners: new Set() });

    return true;
  }

  private placeBet(betAmount: number, isBlind: boolean = false): void {
    // Temporary values to ensure the bet is valid
    let _player = _.cloneDeep(this.player);
    let _round = _.cloneDeep(this.round);

    const playersCurrentTotalBet = this.player.currentBet + betAmount;

    // Loop through pots and assign bets to each open pot
    _round.pots.forEach((pot) => {
      if (pot.isOpen && pot.allInState) {
        pot.size += pot.allInState.amount; // Add to pot
        _player.chipCount -= pot.allInState.amount; // Subtract from chipCount
        betAmount -= pot.allInState.amount; // Update remaining betAmount
      } else if (pot.isOpen) {
        pot.size += betAmount; // Add to pot
        _player.chipCount -= betAmount; // Subtract from chipCount
        betAmount -= betAmount; // Update remaining betAmount to 0
      }
      if (betAmount < 0)
        throw new Error('Invalid pot state: ' + console.log(JSON.stringify(_round.pots)));
      pot.eligibleWinners.add(_player.id); // Current player is eligible to win this (side) pot
    });

    _player.currentBet += playersCurrentTotalBet;
    if (playersCurrentTotalBet > _round.highestBet) {
      _round.highestBet = playersCurrentTotalBet;
      if (!isBlind) {
        _round.stoppingPoint = _player.id;
      }
    }

    this.round = _.cloneDeep(_round);
    this.player = _.cloneDeep(_player);
  }
}
