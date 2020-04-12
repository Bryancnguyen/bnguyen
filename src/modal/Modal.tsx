import React from 'react';
import './modal.scss';

class Modal extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className='modal'>
      <div className='modal-overlay'/>
      <div className='modal-container'>
        <span className='bryan icon-close'/>
        <div className='content'>
          {this.props.children}
        </div>
        </div>
    </div>);
  }
}

export default Modal;
