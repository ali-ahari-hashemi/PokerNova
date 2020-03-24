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
      players: [],
      currentDealer: -1
    });
  }

  start() {
    this.gameState.isActive = true;
    this.addPlayer();
    this.addPlayer();
    this.addPlayer();
    this.addPlayer();

    // Pick random dealer out of current players
    this.gameState.currentDealer = Math.floor(
      Math.random() * this.gameState.players.length
    );

    this.currentRound = new Round({
      players: this.gameState.players,
      currentDealer: this.gameState.currentDealer
    });
    this.currentRound.start();
  }

  addPlayer() {
    const players = this.gameState.players;
    players.length < 9 &&
      players.push({
        id: this.gameState.players.length,
        name: "name",
        currentBet: 0,
        chipCount: 200,
        pocket: [],
        isActiveInRound: true
      });
    // set socket identifier, respond to player with what their ID is (maybe set a cookie?)
  }
}
