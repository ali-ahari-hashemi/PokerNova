import express from 'express';
import Game from './classes/Game';
import { v1 as uuid } from 'uuid';

/**
 * Application:
 * -  Sends gameState to client
 * -  Receives actions from client
 */

const app = express();
const port = 5000;
const games: Map<string, Game> = new Map();

app.get('/', (req, res) => {
  const gameId: string = uuid();
  games.set(gameId, new Game());
  res.send(
    `Game created! You can access your holdem game and invite your friends using the following link: localhost:${port}/game/${gameId}`
  );

  console.log('active gameIds:');
  games.forEach((value: Game, key) => {
    console.log(key);
  });
});

app.get('/game/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  if (games.has(gameId)) {
    res.send(`game id: ${gameId}`);

    //TODO: do game management stuff such as start, stop, etc...
    // games.get(gameId).start();
  } else {
    res.send('game does not exist, sorry :(');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const g = new Game();
g.start();
