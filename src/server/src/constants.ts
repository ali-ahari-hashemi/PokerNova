export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['h', 'd', 'c', 's'];

export enum ActionType {
  fold = 'fold',
  check = 'check',
  call = 'call',
  raise = 'raise',
  allIn = 'allIn',
  bet = 'bet', // when you are the first to bet
}
