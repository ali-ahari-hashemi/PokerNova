import Game from '../classes/Game';
import { defaultPlayer } from '../tests/_mockData';
import cloneDeep from 'lodash.clonedeep';

const game = new Game({ id: 'testID' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 0, name: 'Ali' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 1, name: 'Austin' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 2, name: 'Jacob' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 3, name: 'Alex' });
game.start();
