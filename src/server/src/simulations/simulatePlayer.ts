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
  socket.emit('joinGame', '4be63210-6fc1-11ea-9ba6-f5047651f5ab', 0);
});

const socket2 = io.connect('http://localhost:5000');
socket2.on('connect', () => {
  console.log(socket2.id + ' successfully connected');
  socket2.emit('joinGame', '4be63210-6fc1-11ea-9ba6-f5047651f5ab', 1);
});

const socket3 = io.connect('http://localhost:5000');
socket3.on('connect', () => {
  console.log(socket3.id + ' successfully connected');
  socket3.emit('joinGame', '4be63210-6fc1-11ea-9ba6-f5047651f5ab', 2);
});

const socket4 = io.connect('http://localhost:5000');
socket4.on('connect', () => {
  console.log(socket4.id + ' successfully connected');
  socket4.emit('joinGame', '4be63210-6fc1-11ea-9ba6-f5047651f5ab', 3);
});
