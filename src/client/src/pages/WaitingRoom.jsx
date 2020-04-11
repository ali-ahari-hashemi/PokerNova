import React from 'react';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import './WaitingRoom.css';

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '', // TODO: handle when game is full
      name: '',
      linkCopied: false,
      gameJoined: false, // TODO: think about page reload resetting this state - will produce a bug BUG
    };
  }

  handleJoinGameClick() {
    const { name } = this.state;
    const { gameId, gameJoined } = this.props;

    if (!gameJoined) {
      this.props.socket.emit('joinGame', { gameId, name });
      this.setState({ gameJoined: true });
    }
  }

  handleStartGameClick() {
    const { gameId } = this.props;

    fetch('/api/game/start', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: gameId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('success starting game');
        } else if (response.status === 404) {
          this.setState({ error: 'Something went wrong, try again.' });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        this.setState({ error: 'Error starting game.' });
      });
  }

  handleCopyLink() {
    const { linkCopied } = this.props;
    const link = window.location.href;

    if (!linkCopied) {
      navigator.clipboard.writeText(link);
      this.setState({ linkCopied: true });
    }
  }

  render() {
    const { linkCopied, gameJoined } = this.state;
    const { gameId } = this.props;
    const link = window.location.href;
    const players = get(this.props.gameState, 'players', []);

    return (
      <div className="WaitingRoomContainer">
        <div className="WaitingRoomPlayersListContainer" />
        <div className="WaitingRoom">
          <h1 className="WaitingRoomTitle">PokerNova</h1>
          <div className="WaitingRoomGameLinkContainer">
            <p className="WaitingRoomGameLinkText">{`${link}`}</p>
            <div
              className={`WaitingRoomGameLinkCopy ${linkCopied && 'ButtonAlreadyPressed'}`}
              onClick={() => this.handleCopyLink()}
            >{`${linkCopied ? 'Copied!' : 'Copy Link'}`}</div>
          </div>
          <div className="WaitingRoomInputContainer">
            <p className="WaitingRoomInputText">Name: </p>
            <input
              className="WaitingRoomInput"
              type="text"
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
            <div
              className={`WaitingRoomSubmitButton ${gameJoined && 'ButtonAlreadyPressed'}`}
              onClick={() => this.handleJoinGameClick()}
            >{`${gameJoined ? 'Joined!' : 'Join Game'}`}</div>
          </div>

          {this.state.error && <p className="WaitingRoomError">{this.state.error}</p>}
          <div className="WaitingRoomInputContainer">
            <div className="WaitingRoomSubmitButton" onClick={() => this.handleStartGameClick()}>
              Start Game
            </div>
          </div>
        </div>

        <div className="WaitingRoomPlayersListContainer">
          <h1 className="WaitingRoomPlayersListTitle">Players:</h1>
          {players.map((player) => (
            <p className="WaitingRoomPlayersListItem">{player.name}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(WaitingRoom);
