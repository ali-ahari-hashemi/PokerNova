import IGame from "../interfaces/IGame";
import Deck from "./Deck";
import Round from "./Round";

/** Game:
 *  - Holds gameState
 *  - Initializes gameState when players are joining and game is starting
 *  - Manages rounds
 */
export default class Game {
  private gameState: IGame;
  private deck: Deck;
  private currentRound: Round;

  constructor() {
    this.gameState = {
      isActive: false,
      currentDealer: -1,
      players: []
    };
    this.deck = new Deck();
    this.currentRound = new Round();
  }

  start() {
    this.gameState.isActive = true;

    // Pick random dealer out of current players
    this.gameState.currentDealer = Math.floor(
      Math.random() * this.gameState.players.length
    );
  }

  addPlayer() {
    const players = this.gameState.players;
    players.length < 9 &&
      players.push({ id: this.gameState.players.length, pocket: [] });
    // set socket identifier, respond to player with what their ID is (maybe set a cookie?)
  }

  // Deals two cards to each player in the game
  deal() {
    for (let i = 0; i < 2; i++) {
      this.gameState.players.map(player =>
        player.pocket.push(this.deck.draw())
      );
    }
  }

  // Draws either 3 cards or 1 card depending on the betting round
  draw() {
    const board = this.gameState.board;
    if (board.length == 0) {
      for (let i = 0; i < 3; i++) {
        board.push(this.deck.draw());
      }
    } else {
      board.push(this.deck.draw());
    }
  }

  print() {
    console.log(this.gameState.players);
    console.log(this.gameState.board);
  }
}

//module.exports = Game;
