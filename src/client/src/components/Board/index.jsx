import React from 'react';
import './index.scss';
import { Grid } from '@material-ui/core';
import Card from '../Card';

const renderBoardCards = (cards) => {
  const numEmptyCards = 5 - cards.length;

  const populatedCards = cards.map((card, i) => {
    return (
      <Grid item xs={2} style={{ height: '100%', margin: 4 }}>
        <Card key={`populated-card-${i}`} rank={card.rank} suit={card.suit} />
      </Grid>
    );
  });

  const emptyCards = Array(numEmptyCards)
    .fill()
    .map((item, i) => {
      return (
        <Grid item xs={2} style={{ height: '100%', margin: 2 }}>
          <Card key={`empty-card-${i}`} empty={true} />
        </Grid>
      );
    });

  return populatedCards.concat(emptyCards);
};

const Board = ({ cards }) => {
  return (
    <div className="boardContainer">
      <Grid container xs={12} justify="center" alignItems="center">
        {renderBoardCards(cards)}
      </Grid>
    </div>
  );
};

export default Board;
