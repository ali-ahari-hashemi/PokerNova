import io from 'socket.io-client';
import querystring from 'querystring';
import http from 'http';

/** Simulate Players:
 *  - Creates a game via api
 *  - Connects a player to that game via socket
 *  - Make sure to have server running before running this file
 */

const req = http.request(
  {
    host: 'localhost',
    port: '5000',
    path: '/api/game/create',
    method: 'POST',
  },
  res => {
    res.setEncoding('utf8');
    res.on('data', chunk => {
      const data = JSON.parse(chunk);
      const gameId = data.id;
      const socket = io.connect('http://localhost:5000');
      socket.on('connect', () => {
        console.log(socket.id + ' successfully connected');
        socket.emit('joinGame', gameId, 0);
      });
    });
  }
);

req.write(
  querystring.stringify({
    pin: '0000',
  })
);
