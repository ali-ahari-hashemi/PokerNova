import Game from '../classes/Game';
import { defaultPlayer } from '../tests/_mockData';
import cloneDeep from 'lodash.clonedeep';
import { ActionType } from '../constants';

const game = new Game({ id: 'testID' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 0, name: 'Ali' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 1, name: 'Austin' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 2, name: 'Jacob' });
game.addPlayer({ ...cloneDeep(defaultPlayer), id: 3, name: 'Alex' });
game.start();

while (game.isActiveGame()) {
  game.getRound().performAction({ actionType: ActionType.bet, betAmount: 200 });
  game.getRound().increment();

  game.getRound().performAction({ actionType: ActionType.bet, betAmount: 200 });
  game.getRound().increment();

  game.getRound().performAction({ actionType: ActionType.bet, betAmount: 200 });
  game.getRound().increment();
}
