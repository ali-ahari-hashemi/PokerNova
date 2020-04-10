import React from 'react';
import './Chips.css';

function Chips({ amount }) {
  return (
    <div className="ChipsContainer">
      <div className="ChipsBundledContainer">
        <div
          className="Chips"
          style={{
            position: 'relative',
            marginRight: '-8px',
          }}
        >
          <p className="ChipsText">$</p>
        </div>
        <div className="Chips">
          <p className="ChipsText">$</p>
        </div>
      </div>

      <p className="ChipsAmountText">${amount}</p>
    </div>
  );
}

export default Chips;
