import React from 'react';
import './resume.scss';

class Resume extends React.Component{
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  private onResumeBtnClick() {
    const link = document.createElement('a');
    link.href = `${process.env}/images/BryansResume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
    <div id='resume'>
      {/* <button onClick={this.onResumeBtnClick}>Resume</button> */}
    </div>);
  }
}


export default Resume;
