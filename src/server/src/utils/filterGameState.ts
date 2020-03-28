import IGame from '../interfaces/IGame';
import IGameStateToSend, { IRoundStateToSend } from '../interfaces/IGameStateToSend';

export const filterGameState = (gameState: IGame): IGameStateToSend => {
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
  };

  const gameStateToSend: IGameStateToSend = {
    id: gameState.id,
    isActive: gameState.isActive,
    currentDealer: gameState.currentDealer,
    players: gameState.players,
    currentRound: currentRoundToSend,
  };

  return gameStateToSend;
};
