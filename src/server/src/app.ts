import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import socketIO from 'socket.io';
import Game from './classes/Game';
import { v1 as uuid } from 'uuid';
import { defaultPlayer } from './tests/_mockData';
import cloneDeep from 'lodash.clonedeep';
import { IAction } from './interfaces/IAction';
import { IPerformActionAPI } from './interfaces/IAPI';

export type gameId = string;
export type playerId = string;

/**
 * Application:
 * -  Sends gameState to client
 * -  Receives actions from client
 */

const app = express();
const server = new http.Server(app);
const io = socketIO(server);
const port = 5000;
const games: Map<string, Game> = new Map();
const playersToGameMapping: Map<playerId, gameId> = new Map();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// SOCKET STUFF

io.on('connection', socket => {
  const socketId: playerId = socket.id;
  console.log(`New connection! socket id: ${socketId}`);

  socket.on('joinGame', (gameId: gameId, seat: number) => {
    const game = games.get(gameId);
    if (game) {
      playersToGameMapping.set(socketId, gameId);
      game.addPlayer({
        ...cloneDeep(defaultPlayer),
        id: seat,
        socketId,
      });
    } else {
      // TODO: some error handling here
    }
  });
});

// API ROUTES

app.get('/', (req, res) => {
  res.send('PokerNova Coming Soon...');
});

app.get('/game/:id', (req, res) => {
  const { id } = req.params;
  if (games.has(id)) {
    // TODO: send game front end code
    res.send({
      id,
    });
  } else {
    res.status(404).send('game does not exist, sorry :(');
  }
});

app.post('/api/game/create', (req, res) => {
  const { pin } = req.body;
  const id: string = uuid();
  games.set(id, new Game({ id }));
  res.status(200).send({
    id,
    url: `localhost:${port}/game/${id}`,
  });
});

app.post('/api/game/start', (req, res) => {
  const { id } = req.body;
  if (games.has(id)) {
    const game = games.get(id) as Game;
    game.start();
    res.status(200).send('Game successfully started!');
  } else {
    res.status(404).send('Game does not exist, sorry :(');
  }
});

app.post('/api/game/performAction', (req, res) => {
  const data: IPerformActionAPI = req.body;
  const game = games.get(data.gameId);
  if (game && game.getRound().getCurrentPlayer().id == data.playerId) {
    game.getRound().performAction(data.action);
    game.getRound().increment();
    res.status(200).send('Successfully performed action. Now its the next players turn!');
  } else {
    res.status(400).send('Error performing action. Please make sure gameId and playerId is valid');
  }
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
