import React from 'react';
import WaitingRoom from './WaitingRoom';
import Game from './Game';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';
import { mapAPIDataToUIState } from '../utilities/mapAPIDataToUIState';

class GamePath extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loading: true, // For now, loading component is a blank page since get request is fast
      gameExists: true, // determines whether to render WaitingRoom/Game or NotFound
    };
    this.gameId = props.match.params.id;
  }

  componentDidMount() {
    fetch(`/api/game/${this.gameId}`, {
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

  render() {
    return !this.state.loading ? (
      !this.state.error ? (
        this.state.gameExists ? (
          this.props.gameState && this.props.gameState.isActive ? (
            <Game
              seat={this.props.seat}
              {...mapAPIDataToUIState(this.props.gameState, this.props.seat)}
              gameId={this.gameId}
            />
          ) : (
            <WaitingRoom
              gameState={this.props.gameState}
              socket={this.props.socket}
              gameId={this.gameId}
            />
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
