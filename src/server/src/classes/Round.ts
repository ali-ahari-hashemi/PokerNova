import { IRound } from "../interfaces/IRound";
import { IPlayer } from "../interfaces/IPlayer";
import Deck from "./Deck";
import { getValidActionTypes } from "../utils/getValidActionTypes";
import { Action } from "./Action";
import { ActionType } from "../enums";
import { CardHelpers, IHandWinners, IPlayerCards } from "../utilities/CardHelpers";

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
      stoppingPoint: -1,
      deck: new Deck(),
      playersFolded: [],
      playersAllIn: []
    };
    this.players = params.players;
    this.currentDealer = params.currentDealer;
  }

  async start(): Promise<void> {
    console.log("dealer", this.currentDealer);
    this.deal();

    for (let i = 0; i < 4; i++) {
      const offset = i == 0 ? 3 : 1;
      this.round.stoppingPoint = (this.currentDealer + offset) % this.players.length;
      this.round.currentPlayer = this.round.stoppingPoint;
      this.round.highestBet = 0;

      if (i !== 0) {
        this.draw();
      }

      console.log("=============== NEW ROUND =================");
      this.print();
      console.log("\n\n\n\n");

      do {
        if (!this.shouldContinue()) {
          break;
        }

        // Check if player is still in play (not folded and not all in)
        if (
          this.round.playersFolded.indexOf(this.round.currentPlayer) == -1 &&
          this.round.playersAllIn.indexOf(this.round.currentPlayer) == -1
        ) {
          const validActionTypes = getValidActionTypes(
            this.players[this.round.currentPlayer],
            this.round.highestBet
          );

          const ans = await this.getActionTypeFromUser(validActionTypes);
          new Action(
            {
              actionType: ans[0] as ActionType,
              betAmount: parseInt(ans[1])
            },
            this.players[this.round.currentPlayer],
            this.round
          ).performAction();
        }

        this.print();

        this.round.currentPlayer = (this.round.currentPlayer + 1) % this.players.length;
      } while (this.round.currentPlayer !== this.round.stoppingPoint);
    }

    const winners = this.determineWinners();
    console.log("WINNERS: ", winners);
  }

  // Deals two cards to each player
  deal(): void {
    for (let i = 0; i < 2; i++) {
      this.players.map(player => player.pocket.push(this.round.deck.draw()));
    }
  }

  /**
   * -  Draws cards from the top of the deck to the board
   * -  Burns top card before drawing any cards
   * -  Draws 3 cards for the flop, and 1 card for the turn and the river
   */
  draw(): void {
    const board = this.round.board;
    this.round.deck.draw(); // burn top card
    if (board.length == 0) {
      for (let i = 0; i < 3; i++) {
        board.push(this.round.deck.draw());
      }
    } else {
      board.push(this.round.deck.draw());
    }
  }

  print(): void {
    console.log({
      board: this.round.board,
      pot: this.round.pot,
      currentPlayer: this.round.currentPlayer,
      highestBet: this.round.highestBet,
      stoppingPoint: this.round.stoppingPoint,
      playersFolded: this.round.playersFolded,
      playersAllIn: this.round.playersAllIn
    });

    for (let player of this.players) {
      console.log(
        `player ${player.id}: ${player.pocket} (${CardHelpers.determineHandName(
          this.round.board.concat(player.pocket)
        )})`
      );
    }
  }

  // This function returns true if there are more than 2 players in play and at least one of them is not all in
  private shouldContinue(): boolean {
    const playersInPlay = this.players.length - this.round.playersFolded.length;
    return playersInPlay > 1 && playersInPlay > this.round.playersAllIn.length;
  }

  // This is a temporary function used to get input from the user through the console. Used for development purposes and testing
  private async getActionTypeFromUser(validActionTypes: ActionType[]): Promise<string[]> {
    const readline = require("readline");
    function askQuestion(query: string) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise(resolve =>
        rl.question(query, (ans: string) => {
          rl.close();
          resolve(ans.split(" "));
        })
      );
    }

    console.log(
      `valid action types for player ${this.round.currentPlayer}: ${validActionTypes}`
    );
    const ans = (await askQuestion(
      `Player ${this.round.currentPlayer}, What action would you like to take? (for raise, must be in the form "raise amount") `
    )) as string[];

    return ans;
  }

  determineWinners(): IHandWinners {
    let playerCards: IPlayerCards[] = [];

    this.players
      .filter(player => {
        return player.isActiveInRound;
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
