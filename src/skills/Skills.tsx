import React from 'react';
import './skills.scss';
import Panel from '../panel/Panel';

class Skills extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='skills'>
      <Panel title={'Skills'}>
      </Panel>
    </div>);
  }
}

export default Skills;
