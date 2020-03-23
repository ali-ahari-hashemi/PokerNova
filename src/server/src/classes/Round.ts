import { IRound } from "../interfaces/IRound";
import { IPlayer } from "../interfaces/IPlayer";
import Deck from "./Deck";
import {
  CardHelpers,
  IHandWinners,
  IPlayerCards
} from "../utilities/CardHelpers";

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
    console.log(this.round.board);
    for (let player of this.players) {
      console.log(
        player.id +
          ": " +
          player.pocket +
          " (" +
          CardHelpers.determineHandName(
            this.round.board.concat(player.pocket)
          ) +
          ")"
      );
    }
  }

  determineWinners(): IHandWinners {
    let playerCards: IPlayerCards[] = [];

    this.players
      .filter(player => {
        return true;
        // player.isActiveInRound;
      })
      .forEach(activePlayer => {
        playerCards.push({
          id: activePlayer.id,
          cards: activePlayer.pocket.concat(this.round.board)
        });
      });

    return CardHelpers.determineWinners(playerCards);
  }
}
