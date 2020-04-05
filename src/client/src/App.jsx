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

  socket.on('connect', () => {
    console.log('in app.js ' + socket.id + ' successfully connected');
  });

  socket.on('stateUpdated', (data) => {
    console.log('in app.js data', data);
    setGameState(data);
  });

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} {...gameState} socket={socket} />}
          />
          <Route
            path="/game/:id"
            render={(props) => <GamePath {...props} {...gameState} socket={socket} />}
          />
          <Route render={(props) => <NotFound {...props} {...gameState} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
