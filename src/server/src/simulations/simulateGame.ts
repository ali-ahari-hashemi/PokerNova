import Game from '../classes/Game';
import { defaultPlayer } from '../tests/_mockData';
import cloneDeep from 'lodash.clonedeep';
import { ActionType } from '../constants';

const game = new Game({ id: 'testID' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 0, name: 'Ali' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 1, name: 'Austin' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 2, name: 'Jacob' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 3, name: 'Alex' });
game.startRound();

// for (let i = 0; i < 4; i++) {
//   for (let j = 0; j < 4; j++) {
//     game.getRound().performAction({ actionType: ActionType.bet, betAmount: 5 });
//     game.getRound().increment();
//   }
// }

game.getRound().performAction({ actionType: ActionType.fold });
game.getRound().increment();

game.getRound().performAction({ actionType: ActionType.fold });
game.getRound().increment();

game.getRound().performAction({ actionType: ActionType.check });
game.getRound().increment();

game.getRound().performAction({ actionType: ActionType.check });
game.getRound().increment();

// NEW ROUND

game.getRound().performAction({ actionType: ActionType.check });
game.getRound().increment();
