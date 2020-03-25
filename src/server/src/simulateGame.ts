import Game from './classes/Game';
import { defaultPlayer } from './tests/_mockData';
import { IPlayer } from './interfaces/IPlayer';

const game = new Game();
game.addPlayer({ ...defaultPlayer, id: 0, name: 'Ali' });
game.addPlayer({ ...defaultPlayer, id: 1, name: 'Austin' });
game.addPlayer({ ...defaultPlayer, id: 2, name: 'Jacob' });
game.addPlayer({ ...defaultPlayer, id: 3, name: 'Alex' });
game.start();
