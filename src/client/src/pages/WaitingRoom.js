import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import './WaitingRoom.css';

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      error: '', // TODO: handle when game is full
      name: '', 
      linkCopied: false,
      gameJoined: false // TODO: think about page reload resetting this state - will produce a bug BUG
    }

    this.socket = '';

    this.handleJoinGameClick = this.handleJoinGameClick.bind(this);
    this.handleStartGameClick = this.handleStartGameClick.bind(this);
    this.hanldeCopyLink = this.hanldeCopyLink.bind(this);
  }

  componentDidMount() {
    const endpoint = 'http://localhost:5000';
    this.socket = io.connect(endpoint);

    this.socket.on('connect', () => {
      console.log(this.socket.id + ' successfully connected');
    });

    // TODO: as of now you have to join the game to get the state updates
    // from a ux perspective you should be able to see the players before joining
    this.socket.on("stateUpdated", data => { console.log('data', data) });
  }

  handleJoinGameClick() {
    const { name } = this.state;
    const { gameId, gameJoined } = this.props;

    if (!gameJoined) {
      this.socket.emit('joinGame', { gameId, name });
      this.setState({ gameJoined: true });
    }
  }

  handleStartGameClick() {
    const { pin } = this.state;
    const { gameId, setGameActive } = this.props;

    if (!pin) {
      this.setState({ error: 'Please supply a pin.'})
      return;
    }

    fetch('/api/game/start', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        id: gameId,
        pin
      }),
    })
      .then((response) => {
        if (response.ok) {
          setGameActive();
        } else if (response.status === 404) {
          this.setState({ error: 'Incorrect pin.' });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        this.setState({ error: 'Error starting game.' });
      });
  }

  hanldeCopyLink() {
    const { linkCopied } = this.props;
    const { gameId } = this.props;
    const link = `localhost:3000/game/${gameId}`;

    if (!linkCopied) {
      navigator.clipboard.writeText(link);
      this.setState({ linkCopied: true })
    }
  }

  render() {
    const { linkCopied, gameJoined } = this.state;
    const { gameId } = this.props;
    const link = `localhost:3000/game/${gameId}`;

    return (
      <div className="WaitingRoom">
        <h1 className="WaitingRoomTitle">PokerNova</h1>
        <div className="WaitingRoomGameLinkContainer">
          <p className="WaitingRoomGameLinkText">{`${link}`}</p>
          <div
            className={`WaitingRoomGameLinkCopy ${linkCopied && 'ButtonAlreadyPressed'}`}
            onClick={this.hanldeCopyLink}
          >{`${linkCopied ? 'Copied!': 'Copy Link'}`}</div>
        </div>
        <div className="WaitingRoomInputContainer">
          <p className="WaitingRoomInputText">Name: </p>
          <input
            className="WaitingRoomInput"
            type="text"
            value={this.state.name}
            onChange={(e) => { this.setState({ name: e.target.value }) }}
          />
          <div
            className={`WaitingRoomSubmitButton ${gameJoined && 'ButtonAlreadyPressed'}`}
            onClick={this.handleJoinGameClick}
          >{`${gameJoined ? 'Joined!' : 'Join Game'}`}</div>
        </div>
        {this.state.error && <p className="WaitingRoomError">{this.state.error}</p>}
        <div className="WaitingRoomInputContainer">
          <p className="WaitingRoomInputText">Pin: </p>
          <input
            className="WaitingRoomInput"
            type="text"
            value={this.state.pin}
            onChange={(e) => { this.setState({ pin: e.target.value }) }}
          />
          <div
            className="WaitingRoomSubmitButton"
            onClick={this.handleStartGameClick}
          >Start Game</div>
        </div>
      </div>
    );
  }
}

export default withRouter(WaitingRoom);
