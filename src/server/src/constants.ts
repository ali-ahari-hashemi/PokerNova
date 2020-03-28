export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['h', 'd', 'c', 's'];

export enum ActionType {
  fold = 'fold',
  check = 'check',
  bet = 'bet',
}

export enum BettingRound {
  preFlop = 'preFlop',
  flop = 'flop',
  turn = 'turn',
  river = 'river',
}

export type gameId = string;
export type playerId = string;
