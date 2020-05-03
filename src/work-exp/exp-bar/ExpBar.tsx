import React from 'react';
import { useAnimation } from '../../animations/useAnimation';
import { useInView } from '../../utils/useInView';
import './expBar.scss';

export const ExpBar: React.FC<ExpBarProps> = ({ color, percentage, text }) => {
  const { setRef, inView } = useInView();
  return (
    <div ref={setRef} className='exp-bar'>
      {
        inView &&
        <Bar percentage={percentage} color={color} />
      }
      <span className='text'>{text}</span>
    </div>);
};

const Bar: React.FC<BarProps> = ({ percentage, color }) => {
  const { progress } = useAnimation(250);

  const style = {
    width: progress * percentage * 12,
    backgroundColor: color,
    transition: 'width 1s ease-in-out',
  };

  return (
    <div className='bar' style={style} />
  )
}

interface BarProps {
  percentage: number;
  color: string;
}

interface ExpBarProps {
  percentage: number;
  text: string;
  color: string;
}

export default ExpBar;
