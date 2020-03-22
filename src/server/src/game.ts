import IGame from "./interfaces/IGame";
import Deck from "./deck";

export default class Game {
  gameState: IGame;
  private deck: Deck = new Deck();

  constructor() {
    this.gameState = {
      isActive: false,
      board: [],
      pot: 0,
      highestBet: 0,
      currentPlayer: -1,
      currentDealer: -1,
      players: []
    };
    this.deck = new Deck();
  }

  start() {
    this.gameState.isActive = true;
  }

  addPlayer() {
    const players = this.gameState.players;
    players.length < 9 &&
      players.push({ id: this.gameState.players.length, pocket: [] });
  }

  // Deals two cards to each player in the game
  deal() {
    for (var i = 0; i < 2; i++) {
      this.gameState.players.map(player =>
        player.pocket.push(this.deck.draw())
      );
    }
  }

  // Draws either 3 cards or 1 card depending on the betting round
  draw() {
    const board = this.gameState.board;
    if (board.length == 0) {
      for (var i = 0; i < 3; i++) {
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
