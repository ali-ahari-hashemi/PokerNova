import React from 'react';
import './index.scss';

const PulsatingCircle = () => {
  return (
    <div className="PulseContainer">
      <div class="Circle" style={{ animationDelay: '-4s' }}></div>
      <div class="Circle" style={{ animationDelay: '-3s' }}></div>
      <div class="Circle" style={{ animationDelay: '-2s' }}></div>
      <div class="Circle" style={{ animationDelay: '-1s' }}></div>
      <div class="Circle" style={{ animationDelay: '0s' }}></div>
    </div>
  );
};

export default PulsatingCircle;
