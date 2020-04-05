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
    };
  }

  componentDidMount() {
    const gameId = this.props.match.params.id;

    fetch(`/api/game/${gameId}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ loading: false, gameExists: true });
        } else if (response.status === 404) {
          this.setState({ loading: false, gameExists: false });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ loading: false, error: 'Application Error. Please try again later.' });
      });
  }

  setErrorPage(error) {
    this.setState({
      error,
    });
  }

  render() {
    const gameId = this.props.match.params.id;

    return !this.state.loading ? (
      !this.state.error ? (
        this.state.gameExists ? (
          this.props.gameState && this.props.gameState.isActive ? (
            <Game gameId={gameId} setErrorPage={() => this.setErrorPage()} />
          ) : (
            <WaitingRoom socket={this.props.socket} gameId={gameId} />
          )
        ) : (
          <NotFound />
        )
      ) : (
        <p>{this.state.error}</p>
      )
    ) : (
      <></>
    );
  }
}

export default withRouter(GamePath);
