import React, { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import GamePath from "./pages/GamePath";
import io from "socket.io-client";

const endpoint = "http://localhost:5000";
const socket = io.connect(endpoint);

const App = () => {
  const [gameState, setGameState] = useState({
    isActive: false,
    players: [],
  });

  socket.on("connect", () => {
    console.log("in app.js " + socket.id + " successfully connected");
  });

  // TODO: as of now you have to join the game to get the state updates
  // from a ux perspective you should be able to see the players before joining
  socket.on("stateUpdated", (data) => {
    console.log("in app.js data", data);
    setGameState(data);
  });

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/game/:id" render={(props) => <GamePath {...props} />} />
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
