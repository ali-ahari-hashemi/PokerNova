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
        return this.placeBet(betAmount);
      }
    } else {
      return false;
    }
  }

  blind(): boolean {
    return this.placeBet(this.action.betAmount || 0, true);
  }

  private call(): boolean {
    const callAmount = this.round.highestBet - this.player.currentBet;
    console.log(`player ${this.player.id} calling amount: ${callAmount}`);
    this.player.status = `${PlayerStatus.called}`;
    return this.placeBet(callAmount);
  }

  private allIn(): boolean {
    console.log(`player ${this.player.id} going all in`);
    this.player.status = PlayerStatus.allIn;
    this.round.playersAllIn.push(this.player.id);

    if (!this.placeBet(this.player.chipCount)) return false;

    // Update currently active pot to allIn status
    const currPot = this.round.pots[this.round.pots.length - 1];
    currPot.allInState = { amount: this.player.chipCount, player: this.player.id };

    // Create new side pot
    this.round.pots.push({ isOpen: true, size: 0, eligibleWinners: new Set() });

    return true;
  }

  /**
   * Helper function to calculate new betting values for given attempted bet. If any of the values enters and invalid state,
   * throws an error.
   * @param potSize current chip count of pot
   * @param chipCount current chip count of player
   * @param betRemaining chips remaining from the initial attempted bet
   * @param subBetAmount the current part of the bet we are attempting to apply
   */
  private getNewBetValues(
    potSize: number,
    chipCount: number,
    betRemaining: number,
    subBetAmount: number
  ) {
    potSize += subBetAmount;
    chipCount -= subBetAmount;
    betRemaining -= subBetAmount;
    if (chipCount < 0 || betRemaining < 0) {
      throw new Error(
        'Invalid bet attempted: ' + JSON.stringify(this.action) + ' by player ' + this.player.id
      );
    }
    return [potSize, chipCount, betRemaining];
  }

  private placeBet(betAmount: number, isBlind: boolean = false): boolean {
    // Temporary values to ensure the bet is valid
    let _player = _.cloneDeep(this.player);
    let _round = _.cloneDeep(this.round);

    const playersCurrentTotalBet = this.player.currentBet + betAmount;
    let betRemaining = betAmount;

    // Loop through pots and assign bets to each open pot
    _round.pots.forEach((pot) => {
      // Case: open pot in an all-in state
      if (pot.isOpen && pot.allInState) {
        // Case: bet amount is less than is required to match the all in amount of this pot.
        // If the player betting is all-in, this is allowable and we can just bet betAmount
        // If the player betting is NOT all-in, this is an invalid bet - return false.
        if (betRemaining < pot.allInState.amount) {
          if (_player.status === PlayerStatus.allIn) {
            [pot.size, _player.chipCount, betRemaining] = this.getNewBetValues(
              pot.size,
              _player.chipCount,
              betRemaining,
              betRemaining
            );
          } else {
            return false;
          }
          // Case: bet amount is >= amount required to match the all in - bet all-in amount
        } else {
          [pot.size, _player.chipCount, betRemaining] = this.getNewBetValues(
            pot.size,
            _player.chipCount,
            betRemaining,
            pot.allInState.amount
          );
        }

        // Case: open pot NOT in an all-in state
      } else if (pot.isOpen) {
        [pot.size, _player.chipCount, betRemaining] = this.getNewBetValues(
          pot.size,
          _player.chipCount,
          betRemaining,
          betRemaining
        );
      }

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
    return true;
  }
}
