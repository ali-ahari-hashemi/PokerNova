import React from 'react';
import './index.scss';
import Card from '../Card';

const renderBoardCards = (boardCards) => {
  const numEmptyCards = 5 - boardCards.length;

  const populatedCards = boardCards.map((card, i) => {
    return <Card key={`populated-card-${i}`} rank={card.rank} suit={card.suit} />;
  });

  const emptyCards = Array(numEmptyCards)
    .fill()
    .map((item, i) => {
      return <Card key={`empty-card-${i}`} empty={true} />;
    });

  return populatedCards.concat(emptyCards);
};

const GameTable = ({ bettingRound, potTotal, boardCards }) => (
  <div className="GameTable">
    <p className="BettingRoundText">{bettingRound}</p>
    <div className="BoardCardsContainer">{renderBoardCards(boardCards)}</div>
    <p className="PotTotalText">Total Pot: ${potTotal}</p>
  </div>
);

export default GameTable;
