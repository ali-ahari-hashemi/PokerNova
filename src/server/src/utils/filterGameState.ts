import IGame from '../interfaces/IGame';
import IGameStateToSend, { IRoundStateToSend } from '../interfaces/IGameStateToSend';
import { IPlayer } from '../interfaces/IPlayer';
import { IHandWinners } from '../utilities/CardHelpers';

// Remove sensitive data from players list sent to client
function filterPlayers(players: IPlayer[], playerId: number, winners: IHandWinners) {
  return players.map((player) => {
    return {
      ...player,
      pocket:
        player.id === playerId ||
        winners.ids.includes(player.id) ||
        (winners.ids.length > 0 && player.isActiveInRound)
          ? player.pocket
          : [],
    };
  });
}

export const filterGameState = (gameState: IGame, playerId: number = -1): IGameStateToSend => {
  const currentRound = gameState.currentRound.getRound();
  const currentRoundToSend: IRoundStateToSend = {
    board: currentRound.board,
    pot: currentRound.pot,
    highestBet: currentRound.highestBet,
    currentPlayer: currentRound.currentPlayer,
    playersFolded: currentRound.playersFolded,
    playersAllIn: currentRound.playersAllIn,
    bettingRound: currentRound.bettingRound, // undefined before the first round
    isActive: currentRound.isActive,
    winners: currentRound.winners,
  };

  const gameStateToSend: IGameStateToSend = {
    id: gameState.id,
    isActive: gameState.isActive,
    currentDealer: gameState.currentDealer,
    players: filterPlayers(gameState.players, playerId, currentRound.winners),
    currentRound: currentRoundToSend,
  };

  return gameStateToSend;
};
