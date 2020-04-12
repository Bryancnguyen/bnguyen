import React from 'react';
import './about.scss';
import Panel from '../panel/Panel';

class About extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='about'>
      <Panel title={'About Me'}>
      </Panel>
    </div>);
  }
}

export default About;
