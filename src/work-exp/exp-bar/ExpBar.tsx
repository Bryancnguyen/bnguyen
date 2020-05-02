import React, { useState, useEffect } from 'react';
import { useAnimation } from '../../animations/useAnimation';
import { useInView } from '../../utils/useInView';
import './expBar.scss';

export const ExpBar: React.FC<ExpBarProps> = ({ color, percentage, text }) => {

  const [visible, setVisible] = useState(false);
  const { progress, reset } = useAnimation(1000);
  const { setRef, inView } = useInView();

  useEffect(() => {
    setVisible(inView);
    if (!inView) {
      reset();
    }
  }, [setVisible, inView, reset]);

  const style = {
    width: progress * percentage * 12,
    backgroundColor: color,
    transition: 'width 1s ease-in-out',
  };

  return (
    <div ref={setRef} className='exp-bar'>
      {
        visible &&
        <div className='bar' style={style} />
      }
      <span className='text'>{text}</span>
    </div>);
};

interface ExpBarProps {
  percentage: number;
  text: string;
  color: string;
}

export default ExpBar;
