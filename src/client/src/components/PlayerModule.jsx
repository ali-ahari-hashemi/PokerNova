import React from 'react';
import './PlayerModule.css';

function PlayerModule(props) {
  const { player, status, total, active } = props;

  return (
    <div className={`PlayerModule ${active && "PlayerModuleActive"}`}>
      <div className="PlayerModuleTotalContainer">
        <p className="PlayerModuleTotalText">${total}</p>
      </div>
      <div className="PlayerModuleDetailsContainer">
        <p className="PlayerModulePlayerText OneLine">{player}</p>
        <p className="PlayerModuleStatusText OneLine">{status}</p>
      </div>
    </div>
  );
}

export default PlayerModule;
