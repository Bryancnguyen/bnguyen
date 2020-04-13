import React from 'react';
import './button.scss';

class Button extends React.Component<ButtonProps, {}>{
  constructor(props: ButtonProps) {
    super(props);
    this.state = {};
  }

  private onBtnClick = () => {
    this.props.onClick();
  }

  render() {
    return (
    <div className='bry-button'>
      <button className='bry-button-elem' onClick={this.onBtnClick}>{this.props.text}</button>
    </div>);
  }
}

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default Button;
