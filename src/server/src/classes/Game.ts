import IGame from '../interfaces/IGame';
import Round from './Round';
import { IPlayer } from '../interfaces/IPlayer';

interface IParams {
  id: string;
}

/** Game:
 *  - Holds gameState
 *  - Initializes gameState when players are joining and game is starting
 *  - Manages rounds
 */
export default class Game {
  private gameState: IGame;
  private currentRound: Round;

  constructor(params: IParams) {
    this.gameState = {
      id: params.id,
      isActive: false,
      currentDealer: -1,
      players: [],
    };
    this.currentRound = new Round({
      players: [],
      currentDealer: -1,
    });
  }

  start() {
    console.log(`Game ${this.gameState.id} has started! Enjoy losing all your money :)`);
    this.gameState.currentDealer = Math.floor(Math.random() * this.gameState.players.length);
    this.gameState.isActive = true;
    this.startRound();
    this.currentRound.on('roundEnded', () => {
      if (this.isValidGame()) {
        this.startRound();
      } else {
        this.end();
      }
    });
  }

  end() {
    this.gameState.isActive = false;
  }

  getRound(): Round {
    return this.currentRound;
  }

  addPlayer(player: IPlayer) {
    const players = this.gameState.players;
    players.length < 9 && players.push(player);
  }

  // Checks if the game has at least 2 players with chips
  isValidGame(): boolean {
    let count = 0;
    this.gameState.players.map(player => {
      player.chipCount > 0 && count++;
    });
    return count > 1;
  }

  isActiveGame(): boolean {
    return this.gameState.isActive;
  }

  private startRound(): void {
    console.log('starting new round');
    this.currentRound = new Round({
      players: this.gameState.players,
      currentDealer: this.gameState.currentDealer,
    });
    this.currentRound.start();
  }
}
