import React from 'react';
import WaitingRoom from './WaitingRoom';
import Game from './Game';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';

class GamePath extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: true, // For now, loading component is a blank page since get request is fast
      gameExists: true, // determines whether to render WaitingRoom/Game or NotFound
      gameActive: false, // determines whether to render WaitingRoom or Game
    }

    this.setGameActive = this.setGameActive.bind(this);
    this.setErrorPage = this.setErrorPage.bind(this);
  }

  componentDidMount() {
    const gameId = this.props.match.params.id;

    fetch(`/api/game/${gameId}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          this.setState({ loading: false, gameExists: false });
        } else {
          throw new Error();
        }
      })
      .then((myJson) => {
        if (myJson) {
          if (myJson.gameState.isActive) {
            this.setState({ loading: false, gameActive: true });
          } else {
            this.setState({ loading: false, gameActive: false });
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ loading: false, error: 'Application Error. Please try again later.' });
      });
  }

  setGameActive() {
    this.setState({
      gameActive: true,
    })
  }

  setErrorPage(error) {
    this.setState({
      error,
    })
  }

  render() {
    const gameId = this.props.match.params.id;

    return !this.state.loading ?
            !this.state.error ?
              this.state.gameExists ?
                this.state.gameActive ?
                  <Game
                    gameId={gameId}
                    setErrorPage={this.setErrorPage}
                  /> :
                  <WaitingRoom
                    gameId={gameId}
                    setGameActive={this.setGameActive}
                  /> :
                  <NotFound /> :
                  <p>{this.state.error}</p> :
                  <></>
  }
}

export default withRouter(GamePath);
