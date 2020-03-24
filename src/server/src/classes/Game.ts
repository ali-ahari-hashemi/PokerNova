import IGame from '../interfaces/IGame';
import Round from './Round';

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
      players: [],
    };
    this.currentRound = new Round({
      players: [],
      currentDealer: -1,
    });
  }

  async start() {
    this.gameState.isActive = true;

    // TODO: Manage adding players via socket connections
    this.addPlayer();
    this.addPlayer();
    this.addPlayer();
    this.addPlayer();

    // Pick random dealer out of current players
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

  addPlayer() {
    const players = this.gameState.players;
    players.length < 9 &&
      players.push({
        id: this.gameState.players.length,
        name: 'name',
        currentBet: 0,
        chipCount: 200,
        pocket: [],
        isActiveInRound: true,
      });
    // set socket identifier, respond to player with what their ID is (maybe set a cookie?)
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
