import IGame from '../interfaces/IGame';
import Round from './Round';
import { IPlayer } from '../interfaces/IPlayer';
import { EventEmitter } from 'events';

interface IParams {
  id: string;
}

/** Game:
 *  - Holds gameState
 *  - Initializes gameState when players are joining and game is starting
 *  - Manages rounds
 */
export default class Game extends EventEmitter {
  private gameState: IGame;

  constructor(params: IParams) {
    super();
    this.gameState = {
      id: params.id,
      isActive: false,
      currentDealer: -1,
      players: [],
      currentRound: new Round({
        players: [],
        currentDealer: -1,
        blinds: {
          sb: 5,
          bb: 10,
        },
      }),
    };
  }

  start() {
    console.log(`Game ${this.gameState.id} has started! Enjoy losing all your money :)`);
    this.gameState.currentDealer = Math.floor(Math.random() * this.gameState.players.length);
    this.gameState.isActive = true;
    this.startRound();
  }

  end() {
    this.gameState.isActive = false;
  }

  getRound(): Round {
    return this.gameState.currentRound;
  }

  addPlayer(player: IPlayer) {
    const players = this.gameState.players;
    players.length < 8 && players.push(player);
    this.emit('stateUpdated');
  }

  // Checks if the game has at least 2 players with chips
  isValidGame(): boolean {
    let count = 0;
    this.gameState.players.map((player) => {
      player.chipCount > 0 && count++;
    });
    return count > 1;
  }

  isActiveGame(): boolean {
    return this.gameState.isActive;
  }

  getGameState() {
    return this.gameState;
  }

  getNextAvailableSeat() {
    const players = this.gameState.players;
    const maxPlayers = 8;

    return players.length >= maxPlayers ? -1 : players.length;
  }

  private startRound(): void {
    console.log('starting new round');
    this.gameState.currentRound = new Round({
      players: this.gameState.players,
      currentDealer: this.gameState.currentDealer,
      blinds: { sb: 5, bb: 10 },
    });
    this.gameState.currentRound.on('roundEnded', () => {
      if (this.isValidGame()) {
        this.startRound();
      } else {
        this.end();
      }
    });

    this.gameState.currentRound.on('stateUpdated', () => {
      this.stateUpdated();
    });
    this.gameState.currentRound.start();
  }

  private stateUpdated(): void {
    this.emit('stateUpdated');
  }
}
