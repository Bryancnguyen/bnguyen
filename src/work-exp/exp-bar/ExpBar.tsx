import React from 'react';
import './expBar.scss';

class ExpBar extends React.Component<ExpBarProps, {}> {
  constructor(props: ExpBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, percentage, text } = this.props;

    const style = {
      width: percentage * 12,
      backgroundColor: color,
    }

    return (
    <div className='exp-bar'>
      <div className='bar' style={style}/>
      <span className='text'>{text}</span>
    </div>);
  }
}

interface ExpBarProps {
  percentage: number;
  text: string;
  color: string;
}

export default ExpBar;
