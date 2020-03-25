import Game from '../classes/Game';
import { IPlayer } from '../interfaces/IPlayer';

const defaultPlayer: IPlayer = {
  id: 0,
  name: 'name',
  currentBet: 0,
  chipCount: 200,
  pocket: [],
  isActiveInRound: true,
};

const game = new Game();
game.addPlayer({ ...defaultPlayer, id: 0, name: 'Ali' });
game.addPlayer({ ...defaultPlayer, id: 1, name: 'Austin' });
game.addPlayer({ ...defaultPlayer, id: 2, name: 'Jacob' });
game.addPlayer({ ...defaultPlayer, id: 3, name: 'Alex' });
game.start();
