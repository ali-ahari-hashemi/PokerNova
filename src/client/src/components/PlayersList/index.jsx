import React from 'react';
import './index.scss';
import PlayerModule from '../PlayerModule';
import Chips from '../Chips';

const renderTop = (playerIds, playerModules) => {
  return playerModules.map((player, index) => {
    if (playerIds.includes(parseInt(player.id))) {
      const betExists = player.currentBet > 0;

      return (
        <div key={index} className="TopPlayerContainer">
          <PlayerModule {...player} />
          <div className="ChipsContainer">{betExists && <Chips amount={player.currentBet} />}</div>
        </div>
      );
    }
  });
};

const renderBottom = (playerIds, playerModules) => {
  return playerModules.map((player, index) => {
    if (playerIds.includes(parseInt(player.id))) {
      const betExists = player.currentBet > 0;

      return (
        <div key={index} className="BottomPlayerContainer">
          <div className="ChipsContainer">{betExists && <Chips amount={player.currentBet} />}</div>
          <PlayerModule {...player} />
        </div>
      );
    }
  });
};

const renderRight = (playerIds, playerModules) => {
  return playerModules.map((player, index) => {
    if (playerIds.includes(parseInt(player.id))) {
      const betExists = player.currentBet > 0;

      return (
        <div key={index} className="RightPlayerContainer">
          <div className="ChipsContainer">{betExists && <Chips amount={player.currentBet} />}</div>
          <PlayerModule {...player} />
        </div>
      );
    }
  });
};

const renderLeft = (playerIds, playerModules) => {
  return playerModules.map((player, index) => {
    if (playerIds.includes(parseInt(player.id))) {
      const betExists = player.currentBet > 0;

      return (
        <div key={index} className="LeftPlayerContainer">
          <PlayerModule {...player} />
          <div className="ChipsContainer">{betExists && <Chips amount={player.currentBet} />}</div>
        </div>
      );
    }
  });
};

const PlayerList = ({ location, playerIds, playerModules }) => {
  if (location == 'top') {
    return <div className="HorizontalPlayerList Top">{renderTop(playerIds, playerModules)}</div>;
  } else if (location == 'bottom') {
    return (
      <div className="HorizontalPlayerList Bottom">{renderBottom(playerIds, playerModules)}</div>
    );
  } else if (location == 'left') {
    return <div className="VerticalPlayerList Left">{renderLeft(playerIds, playerModules)}</div>;
  } else if (location == 'right') {
    return <div className="VerticalPlayerList Right">{renderRight(playerIds, playerModules)}</div>;
  } else {
    return <div />;
  }
};

export default PlayerList;
