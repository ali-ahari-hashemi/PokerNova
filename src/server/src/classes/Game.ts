import IGame from '../interfaces/IGame';
import Round from './Round';
import { IPlayer } from '../interfaces/IPlayer';
import { Action } from './Action';
import { IAction } from '../interfaces/IAction';

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

  async start() {
    this.gameState.isActive = true;
    this.gameState.currentDealer = Math.floor(Math.random() * this.gameState.players.length);

    while (this.gameState.isActive) {
      console.log('================= NEW ROUND ===============');
      console.log(`Dealer: ${this.gameState.currentDealer}`);
      console.log(this.gameState.players);
      console.log('\n\n\n\n');
      this.currentRound = new Round({
        players: this.gameState.players,
        currentDealer: this.gameState.currentDealer,
      });
      await this.currentRound.start();

      this.gameState.isActive = this.isActiveGame();
    }
  }

  startRound(): void {
    this.currentRound = new Round({
      players: this.gameState.players,
      currentDealer: this.gameState.currentDealer,
    });
    this.currentRound.start();
  }

  getRound(): Round {
    return this.currentRound;
  }

  addPlayer(player: IPlayer) {
    const players = this.gameState.players;
    players.length < 9 && players.push(player);
    //console.log('Players', this.gameState.players);
  }

  // Checks if the game has at least 2 players with chips
  isActiveGame(): boolean {
    let count = 0;
    this.gameState.players.map(player => {
      player.chipCount > 0 && count++;
    });
    return count > 1;
  }
}
