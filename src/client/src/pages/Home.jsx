import React from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this.handleCreateGameClick = this.handleCreateGameClick.bind(this);
  }

  handleCreateGameClick() {
    // reset error state if it was fixed since last click
    this.setState({ error: '' });

    fetch('/api/game/create', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((myJson) => {
        this.props.history.push(`/game/${myJson.id}`);
      })
      .catch((err) => {
        this.setState({ error: 'Error creating game.' });
      });
  }

  render() {
    return (
      <div className="Home">
        <h1 className="HomeTitle">PokerNova</h1>
        {this.state.error && <p className="HomeError">{this.state.error}</p>}
        <div className="HomeCreateGameButton" onClick={this.handleCreateGameClick}>
          Create Game
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
