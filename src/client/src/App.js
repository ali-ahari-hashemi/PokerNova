import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import GamePath from './pages/GamePath';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} />}
          />
          <Route
            path="/game/:id"
            render={props => <GamePath {...props} />}
          />
          <Route
            render={props => <NotFound {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
