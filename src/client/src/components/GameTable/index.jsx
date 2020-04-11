import React from 'react';
import './index.scss';
import Card from '../Card';
import Chips from '../Chips';

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

const renderBets = (playerModules, idsToRender) => {
  return idsToRender.map((id) => {
    if (id < playerModules.length) {
      if (playerModules[id].currentBet > 0) {
        return <Chips amount={playerModules[id].currentBet} />;
      } else {
        return <div />;
      }
    }
  });
};

const GameTable = ({ bettingRound, potTotal, boardCards, playerModules }) => (
  <div className="GameTable">
    <div className="GameTableRow">
      <div className="GameTableLeft">{renderBets(playerModules, [6, 7])}</div>
      <div className="GameTableCenter">
        <div className="GameTableTop">{renderBets(playerModules, [0, 1])}</div>
        <p className="BettingRoundText">{bettingRound}</p>
        <div className="BoardCardsContainer">{renderBoardCards(boardCards)}</div>
        <p className="PotTotalText">Total Pot: ${potTotal}</p>
        <div className="GameTableBottom">{renderBets(playerModules, [4, 5])}</div>
      </div>
      <div className="GameTableRight">{renderBets(playerModules, [2, 3])}</div>
    </div>
  </div>
);

export default GameTable;
