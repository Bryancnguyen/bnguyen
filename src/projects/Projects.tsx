import React from 'react';
import './projects.scss';
import Panel from './../panel/Panel';
import SceneComponent from './components/scene/SceneComponent';

class Projects extends React.Component<{}, ProjectsState> {
  private projects = ['matterport-logo', 'animal-crossing'];

  constructor(props: {}) {
    super(props);
    this.state = {
      slideDirection: '',
      currentProjectCount: 0,
    };
  }

  private onNext = () => {
    this.setState((prevState: ProjectsState) => ({slideDirection: 'next', currentProjectCount: prevState.currentProjectCount++}));
  }

  private onPrev = () => {
    this.setState((prevState: ProjectsState) => ({slideDirection: 'prev', currentProjectCount: prevState.currentProjectCount--}));
  }

  render() {
    return (
    <div id='projects'>
      <Panel title={'Demos'}>
        <div className='projects-container'>
          <SceneComponent slideDirection={this.state.slideDirection} currentProject={this.projects[this.state.currentProjectCount]}/>
          <div className='current-project'>
            {
            this.state.currentProjectCount !== 0 &&
            <div className='click-prev' onClick={this.onPrev}>
              <span className='bryan icon-prev'/>
            </div>
            }
            <span className='project-name'>Matterport Logo</span>
            {
              this.state.currentProjectCount !== this.projects.length - 1 &&
              <div className='click-next' onClick={this.onNext}>
                <span className='bryan icon-next'/>
              </div>
            }
          </div>
        </div>
      </Panel>
    </div>);
  }
}

interface ProjectsState {
  slideDirection: string;
  currentProjectCount: number;
}

export default Projects;
