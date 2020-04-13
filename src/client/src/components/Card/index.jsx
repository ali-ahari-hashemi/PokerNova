import React from 'react';
import './index.scss';
import { getCardColor, getRankText, getSuitImg } from '../../utilities/cardUtils';

function Card(props) {
  const { rank, suit, empty, faceDown } = props;

  if (empty) {
    return (
      <div className="cardAspectRatioContainer">
        <div className="cardAspectRatioInside">
          <div className="Card EmptyCard" />
        </div>
      </div>
    );
  }

  if (!rank || !suit || faceDown) {
    return (
      <div className="cardAspectRatioContainer">
        <div className="cardAspectRatioInside">
          <div className="Card FaceDownCard" />
        </div>
      </div>
    );
  }

  return (
    <div className="cardAspectRatioContainer">
      <div className="cardAspectRatioInside">
        <div className="Card PopulatedCard">
          <div className="CardRankContainer">
            <p className={`CardRank ${getCardColor(suit)}`}>{getRankText(rank)}</p>
          </div>
          <div className="CardSuitContainer">
            <img className="CardSuit" src={getSuitImg(suit)} alt={suit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
