import React from 'react';
import './index.scss';

function Chips({ amount }) {
  return (
    <div className="ChipsContainer">
      <p>${amount}</p>
    </div>
  );
}

export default Chips;
