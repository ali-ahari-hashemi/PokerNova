import React from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import './WaitingRoom.css';

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      seat: 0,
      pin: '',
      copyLinkText: 'Copy Link',
    }

    this.socket = '';

    this.handleJoinGameClick = this.handleJoinGameClick.bind(this);
    this.handleStartGameClick = this.handleStartGameClick.bind(this);
  }

  componentDidMount() {
    const endpoint = 'http://localhost:5000';
    this.socket = io.connect(endpoint);

    this.socket.on('connect', () => {
      console.log(this.socket.id + ' successfully connected');
    });

    this.socket.on("stateUpdated", data => { console.log('data', data) });
  }

  handleJoinGameClick() {
    const { seat } = this.state;
    const seatNum = Number(seat);
    const gameId = this.props.match.params.id;

    this.socket.emit('joinGame', { gameId, seat: seatNum });

    this.socket.on("stateUpdated", data => { console.log('data', data) });

    // TODO: indicate game joined to the UI; disable button and text input
  }

  handleStartGameClick() {
    const gameId = this.props.match.params.id;
    const { pin } = this.state;
    const { setGameActive } = this.props;

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
        } else {
          throw new Error('Error starting game.')
        }
      })
      .catch(() => {
        this.setState({ error: 'Error starting game.' })
      });
  }

  render() {
    const { copyLinkText } = this.state;
    const gameId = this.props.match.params.id;
    const link = `localhost:3000/game/${gameId}`;

    return (
      <div className="WaitingRoom">
        <h1 className="WaitingRoomTitle">PokerNova</h1>
        <div className="WaitingRoomGameLinkContainer">
          <p className="WaitingRoomGameLinkText">{`${link}`}</p>
          <div className="WaitingRoomGameLinkCopy"
            onClick={() => { navigator.clipboard.writeText(link); this.setState({ copyLinkText: 'Copied!'}) }}
            >{copyLinkText}</div>
        </div>
        <div className="WaitingRoomInputContainer">
          <p className="WaitingRoomInputText">Seat Number: </p>
          <input
            className="WaitingRoomInput"
            type="text"
            value={this.state.seat}
            onChange={(e) => { this.setState({ seat: e.target.value }) }}
          />
          <div
            className="WaitingRoomSubmitButton"
            onClick={this.handleJoinGameClick}
          >Join Game</div>
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
