import React, { useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import GamePath from './pages/GamePath';
import io from 'socket.io-client';

const endpoint = 'http://localhost:5000';
const socket = io.connect(endpoint);

const App = () => {
  const [gameState, setGameState] = useState();
  const [seat, setSeat] = useState(0);

  socket.on('connect', () => {
    console.log('in app.js ' + socket.id + ' successfully connected');
  });

  socket.on('stateUpdated', (data) => {
    setGameState(data);
  });

  socket.on('joinGameSuccess', (data) => {
    console.log('in app.js join game success', data);
    setSeat(data.seat);
  });

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} socket={socket} />} />
          <Route
            path="/game/:id"
            render={(props) => <GamePath {...props} {...gameState} seat={seat} socket={socket} />}
          />
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
