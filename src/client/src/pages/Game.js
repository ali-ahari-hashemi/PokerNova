import React from 'react';
import PieTimer from '../components/PieTimer';
import Card from '../components/Card';
import PlayerModule from '../components/PlayerModule';
import { RANKS, SUITS } from '../utilities/constants';
import { getSeatStyles } from '../utilities/utilities';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusText: "Alex's turn. The bet is $2.",
      timerTimeLeft: 14,
      timerTotalTime: 20,
      communityCardsText: 'The River',
      communityCards: [
        {
          rank: RANKS.FOUR,
          suit: SUITS.CLUBS,
        },
        {
          rank: RANKS.QUEEN,
          suit: SUITS.HEARTS,
        },
        {
          rank: RANKS.ACE,
          suit: SUITS.SPADES,
        }
      ],
      potTotal: 104,
      playerModules: [
        {
          player: 'Ali',
          status: 'Current turn',
          total: 462,
          active: false,
        },
        {
          player: 'Austin',
          status: 'Raise $14',
          total: 23,
          active: false,
        },
        {
          player: 'Alex',
          status: 'Current turn',
          total: 91,
          active: true,
        },
        {
          player: 'Bob',
          status: 'Check',
          total: 46,
          active: false,
        },
        {
          player: 'Bill',
          status: 'Raise $14',
          total: 23,
          active: false,
        },
        {
          player: 'Tim',
          status: 'Current turn',
          total: 91,
          active: false,
        },
        {
          player: 'Tom',
          status: 'Check',
          total: 46,
          active: false,
        },
      ],
      userModule: {
        player: 'Jacob',
        status: 'Coming up',
        total: 112,
        active: false,
      },
      userCards: [
        {
          rank: RANKS.THREE,
          suit: SUITS.SPADES,
        },
        {
          rank: RANKS.KING,
          suit: SUITS.DIAMONDS,
        }
      ]
    }
  }

  renderCommunityCards() {
    const { communityCards } = this.state;

    const populatedCards = communityCards.map((card, i) => {
      return (
        <Card
          key={`populated-card-${i}`}
          rank={card.rank}
          suit={card.suit}
        />
      );
    });

    const numEmptyCards = 5 - communityCards.length;

    const emptyCards = Array(numEmptyCards).fill().map((item, i) => {
      return (
        <Card
          key={`empty-card-${i}`}
          rank=""
          suit=""
        />
      );
    })

    return populatedCards.concat(emptyCards);
  }

  renderUserCards() {
    const { userCards } = this.state;

    const populatedCards = userCards.map((card, i) => {
      return (
        <Card
          key={`populated-card-${i}`}
          rank={card.rank}
          suit={card.suit}
        />
      );
    });

    const numEmptyCards = 2 - userCards.length;

    const emptyCards = Array(numEmptyCards).fill().map((item, i) => {
      return (
        <Card
          key={`empty-card-${i}`}
          rank=""
          suit=""
        />
      );
    })

    return populatedCards.concat(emptyCards);
  }

  renderPlayerModules() {
    const { playerModules } = this.state;

    const seatStyles = getSeatStyles(playerModules.length);

    return playerModules.map((item, index) => {
      return (
        <div style={seatStyles[index]}>
          <PlayerModule
            player={item.player}
            status={item.status}
            total={item.total}
            active={item.active}
            />
        </div>
      );
    })
  }

  render() {
    const {
      statusText,
      timerTimeLeft,
      timerTotalTime,
      communityCardsText,
      potTotal,
      userModule,
    } = this.state;

    return (
      <div className="Game">
        <p className="AppLogo">PokerNova&#8482;</p>
        <div className="Header">
          <div className="HeaderStatus">
            <p className="HeaderStatusText">{statusText}</p>
            <div className="TimerContainer">
              <PieTimer
                current={timerTimeLeft}
                total={timerTotalTime}
              />
            </div>
          </div>
          <div className="spacer"/>
        </div>
        <div className="GameTable">
          <p className="CommunityCardsText">{communityCardsText}</p>
          <div className="CommunityCardsContainer">
            {this.renderCommunityCards()}
          </div>
          <p className="PotTotalText">Total Pot: ${potTotal}</p>
          {this.renderPlayerModules()}
        </div>
        <div className="UserContent">
          <div className="UserContentStatusContainer">
            <PlayerModule
              player={userModule.player}
              status={userModule.status}
              total={userModule.total}
              active={userModule.active}
            />
            <div className="UserCardsContainer">
              {this.renderUserCards()}
            </div>
          </div>
          <div className="UserContentOptionsContainer">
            <div className="UserContentOptionsHeader">
              <p className="UserContentOptionsTitle">Options</p>
            </div>
            <div className="UserContentOptionsContent">
              <div className="BetContainer">
                <div className="PlayOption BetButton">BET</div>
                <div className="PlayOption BetAmount">$2</div> { /* This should be a slider or something */}
              </div>
              <div className="PlayOption PlayOptionFull CheckButton">CHECK</div>
              <div className="PlayOption PlayOptionFull FoldButton">FOLD</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

