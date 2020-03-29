import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import WaitingRoom from './pages/WaitingRoom';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameActive: false, // determines whether to render Waiting room or Game on game path
    }

    this.setGameActive = this.setGameActive.bind(this);
  }

  componentDidMount() {
    // TODO: fetch gameActive from backend to decide what to render
  }

  setGameActive() {
    this.setState({
      gameActive: true,
    })
  }

  render() {
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
              render={props => {
                return this.state.gameActive ?
                  <Game {...props} /> :
                  <WaitingRoom {...props}
                    setGameActive={this.setGameActive}
                  />
              }}
            />
            <Route
              render={props => <NotFound {...props}/>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
