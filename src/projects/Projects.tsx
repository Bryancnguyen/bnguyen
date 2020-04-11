import React from 'react';
import './projects.scss';
import Panel from './../panel/Panel';
import SceneComponent from './components/scene/SceneComponent';

class Projects extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='projects'>
      <Panel title={'Demos'}>
        <div className='projects-container'>
          <SceneComponent/>
          <div className='current-project'>
            <div className='click-prev'>
              <span className='bryan icon-prev'/>
            </div>
            <span className='project-name'>Matterport Logo</span>
            <div className='click-next'>
              <span className='bryan icon-next'/>
            </div>
          </div>
        </div>
      </Panel>
    </div>);
  }
}

export default Projects;
