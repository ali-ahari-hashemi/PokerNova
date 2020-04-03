import Game from '../classes/Game';
import { v1 as uuid } from 'uuid';

export const getUniqueId = (games: Map<string, Game>): string => {
  const id: string = uuid().substr(0, 4);
  if (games.has(id)) {
    getUniqueId(games);
  }
  return id;
};
