import React from 'react';
import { RANKS, SUITS } from '../utilities/constants';
import heart from '../images/heart.png';
import diamond from '../images/diamond.png';
import spade from '../images/spade.png';
import club from '../images/club.png';
import './Card.css';

const getRankText = (rank) => {
  switch (rank) {
    case RANKS.ACE:
      return 'A';
    case RANKS.TWO:
      return '2';
    case RANKS.THREE:
      return '3';
    case RANKS.FOUR:
      return '4';
    case RANKS.FIVE:
      return '5';
    case RANKS.SIX:
      return '6';
    case RANKS.SEVEN:
      return '7';
    case RANKS.EIGHT:
      return '8';
    case RANKS.NINE:
      return '9';
    case RANKS.TEN:
      return '10';
    case RANKS.JACK:
      return 'J';
    case RANKS.QUEEN:
      return 'Q';
    case RANKS.KING:
      return 'K';
    default:
      return '';
  }
}

const getCardColor = (suit) => {
  return suit === SUITS.HEARTS || suit === SUITS.DIAMONDS ?
    'red' :
    'black';
}

const getSuitImg = (suit) => {
  switch (suit) {
    case SUITS.HEARTS:
      return heart;
    case SUITS.DIAMONDS:
      return diamond;
    case SUITS.SPADES:
      return spade;
    case SUITS.CLUBS:
      return club;
    default:
      return '';
  }
}

function Card(props) {
  const { rank, suit } = props;

  if (!RANKS[rank] || !SUITS[suit]) {
    return (
      <div className="Card EmptyCard" />
    );
  }

  return (
    <div className="Card PopulatedCard">
      <div className="CardRankContainer">
        <p
          className={`CardRank ${getCardColor(suit)}`}
        >
          {getRankText(rank)} 
        </p>
      </div>
      <div className="CardSuitContainer">
        <img
          className="CardSuit"
          src={getSuitImg(suit)}
          alt={suit}
        />
      </div>
    </div>
  );
}

export default Card;
