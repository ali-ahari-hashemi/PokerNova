import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PieTimer.css';

function PieTimer(props) {
  const { current, total } = props;

  return (
    <div className="">
      <CircularProgressbar
        className="PieTimer"
        value={current}
        maxValue={total}
        text={current}
        background={true}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: '50px',
          textColor: '#FFFFFF',
          pathColor: '#FFFFFF',
          trailColor: 'rgba(0, 0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        })}
      />
    </div>
  );
}

export default PieTimer;
