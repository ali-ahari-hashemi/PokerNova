import io from 'socket.io-client';
import querystring from 'querystring';
import http from 'http';

/** Simulate Players:
 *  - Creates a game via api
 *  - Connects a player to that game via socket
 *  - Make sure to have server running before running this file
 */

// const req = http.request(
//   {
//     host: 'localhost',
//     port: '5000',
//     path: '/api/game/create',
//     method: 'POST',
//   },
//   res => {
//     res.setEncoding('utf8');
//     res.on('data', chunk => {
//       const data = JSON.parse(chunk);
//       const gameId = data.id;
//       const socket = io.connect('http://localhost:5000');
//       socket.on('connect', () => {
//         console.log(socket.id + ' successfully connected');
//         socket.emit('joinGame', gameId, 0);
//       });
//     });
//   }
// );

// req.write(
//   querystring.stringify({
//     pin: '0000',
//   })
// );

const socket = io.connect('http://localhost:5000');
socket.on('connect', () => {
  console.log(socket.id + ' successfully connected');
  socket.emit('joinGame', { gameId: '3893d910-7066-11ea-974c-374c3e3f3b2f', seat: 0 });
});

const socket2 = io.connect('http://localhost:5000');
socket2.on('connect', () => {
  console.log(socket2.id + ' successfully connected');
  socket2.emit('joinGame', { gameId: '3893d910-7066-11ea-974c-374c3e3f3b2f', seat: 1 });
});

const socket3 = io.connect('http://localhost:5000');
socket3.on('connect', () => {
  console.log(socket3.id + ' successfully connected');
  socket3.emit('joinGame', { gameId: '3893d910-7066-11ea-974c-374c3e3f3b2f', seat: 2 });
});

const socket4 = io.connect('http://localhost:5000');
socket4.on('connect', () => {
  console.log(socket4.id + ' successfully connected');
  socket4.emit('joinGame', { gameId: '3893d910-7066-11ea-974c-374c3e3f3b2f', seat: 3 });
});

socket.on('stateUpdated', (gameState: any) => console.log('new game state', gameState));
// socket2.on('stateUpdated', (gameState: any) => console.log('stateUpdated'));
// socket3.on('stateUpdated', (gameState: any) => console.log('stateUpdated'));
// socket4.on('stateUpdated', (gameState: any) => console.log('stateUpdated'));
