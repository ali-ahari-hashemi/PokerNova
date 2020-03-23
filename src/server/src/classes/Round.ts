import { IRound } from "../interfaces/IRound";
import { IPlayer } from "../interfaces/IPlayer";
import Deck from "./Deck";

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
  private round: IRound;
  private players: IPlayer[];
  private currentDealer: number;

  constructor(params: IParams) {
    this.round = {
      board: [],
      pot: 0,
      highestBet: 0,
      currentPlayer: -1,
      deck: new Deck()
    };
    this.players = params.players;
    this.currentDealer = params.currentDealer;
  }

  start(): void {
    this.deal();
    let { currentPlayer } = this.round;
    for (let i = 0; i < 4; i++) {
      const offset = i == 0 ? 3 : 1;
      const stoppingPoint = (this.currentDealer + offset) % this.players.length;
      currentPlayer = stoppingPoint;

      if (i !== 0) {
        this.draw();
      }
      this.print();
      let bettingStarted = false;
      while (currentPlayer !== stoppingPoint || !bettingStarted) {
        bettingStarted = true;

        // TODO: add action for player here

        currentPlayer = (currentPlayer + 1) % this.players.length;
      }
    }
  }

  // Deals two cards to each player in the game
  deal(): void {
    for (let i = 0; i < 2; i++) {
      this.players.map(player => player.pocket.push(this.round.deck.draw()));
    }
  }

  // Draws 3 or 1 cards to the board depending on the betting round
  draw(): void {
    const board = this.round.board;
    if (board.length == 0) {
      for (let i = 0; i < 3; i++) {
        board.push(this.round.deck.draw());
      }
    } else {
      board.push(this.round.deck.draw());
    }
  }

  print(): void {
    console.log(this.round);
  }
}
