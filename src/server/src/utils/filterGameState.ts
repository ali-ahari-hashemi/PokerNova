import IGame from '../interfaces/IGame';
import IGameStateToSend, { IRoundStateToSend } from '../interfaces/IGameStateToSend';
import { IPlayer } from '../interfaces/IPlayer';

// Remove sensitive data from players list sent to client
function filterPlayers(players: IPlayer[], playerId: number) {
  return players.map((player) => {
    return player.id === playerId
      ? player
      : {
          ...player,
          pocket: [],
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
    players: filterPlayers(gameState.players, playerId),
    currentRound: currentRoundToSend,
  };

  return gameStateToSend;
};
