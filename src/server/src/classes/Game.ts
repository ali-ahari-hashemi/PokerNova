import IGame from "../interfaces/IGame";
import Round from "./Round";

/** Game:
 *  - Holds gameState
 *  - Initializes gameState when players are joining and game is starting
 *  - Manages rounds
 */
export default class Game {
  private gameState: IGame;
  private currentRound: Round;

  constructor() {
    this.gameState = {
      isActive: false,
      currentDealer: -1,
      players: []
    };
    this.currentRound = new Round({
      players: this.gameState.players,
      currentDealer: this.gameState.currentDealer
    });
  }

  start() {
    this.gameState.isActive = true;

    // Pick random dealer out of current players
    this.gameState.currentDealer = Math.floor(
      Math.random() * this.gameState.players.length
    );

    console.log("Adding 3 players");
    this.addPlayer();
    this.addPlayer();
    this.addPlayer();
    console.log("Dealing out cards");
    this.currentRound.deal();
    this.currentRound.print();
    console.log("The flop");
    this.currentRound.draw();
    this.currentRound.print();
    console.log("The turn");
    this.currentRound.draw();
    this.currentRound.print();
    console.log("The river");
    this.currentRound.draw();
    this.currentRound.print();
    console.log(this.currentRound.determineWinners());
  }

  addPlayer() {
    const players = this.gameState.players;
    players.length < 9 &&
      players.push({ id: this.gameState.players.length, pocket: [] });
    // set socket identifier, respond to player with what their ID is (maybe set a cookie?)
  }
}
