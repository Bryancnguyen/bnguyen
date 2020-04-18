import React from 'react';
import './resume.scss';
import Button from '../../button/Button';

class Resume extends React.Component{
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  private onResumeBtnClick() {
    try {
      window.open('https://drive.google.com/file/d/1ZMauJyforXSWWJSHiUvXAQjt7THIvq8R/view?usp=sharing', '_blank');
    } catch (err) {
      console.error('Could not open resume link');
    }
  }

  render() {
    return (
    <div id='resume'>
      <Button text={'Resume'} onClick={this.onResumeBtnClick}/>
    </div>);
  }
}


export default Resume;
