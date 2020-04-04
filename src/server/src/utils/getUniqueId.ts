import Game from '../classes/Game';
import { v1 as uuid } from 'uuid';

export const getUniqueId = (games: Map<string, Game>): string => {
  let id: string;
  do {
    id = uuid().substr(0, 4);
  } while (games.has(id));
  return id;
};
