import React from 'react';
import './projects.scss';
import SceneComponent from './components/scene/SceneComponent';
import Pie from './pie/Pie';
export enum ProjectTypes {
  TwoD,
  ThreeD
}
class Projects extends React.Component<{}, ProjectsState> {
  private projects = [{
    name: 'matterport-logo',
    type: ProjectTypes.ThreeD,
  }, {
    name: 'animal-crossing',
    type: ProjectTypes.ThreeD,
  }, {
    name: 'pie',
    type: ProjectTypes.TwoD,
    project: <Pie circumference={100} total={81} viewSize={40}/>
  }
  ];
  private projectsMap: { [key: number]: string } = {
    0: 'Matterport Logo',
    1: 'Animal Crossing in Three',
    2: 'Pie'
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      currentProjectCount: 0,
    };
  }

  private onNext = () => {
    this.setState((prevState: ProjectsState) => ({ currentProjectCount: prevState.currentProjectCount + 1 }));
  }

  private onPrev = () => {
    this.setState((prevState: ProjectsState) => ({ currentProjectCount: prevState.currentProjectCount - 1 }));
  }

  private getUIProject = () => {
    const uiProject = this.projects[this.state.currentProjectCount].project;
    return uiProject ? uiProject : null;
  }

  render() {
    const currentProject = this.projects[this.state.currentProjectCount];

    return (
      <div id='projects'>
        <div className='projects-container'>
          {
            currentProject.type === ProjectTypes.ThreeD &&
            <SceneComponent currentProject={currentProject.name}/>
          }
          {
            currentProject.type === ProjectTypes.TwoD &&
            this.getUIProject()
          }
          <div className='current-project'>
            {
              this.state.currentProjectCount !== 0 &&
              <div className='click-prev' onClick={this.onPrev}>
                <span className='bryan icon-prev' />
              </div>
            }
            <span className='project-name'>{this.projectsMap[this.state.currentProjectCount]}</span>
            {
              this.state.currentProjectCount !== this.projects.length - 1 &&
              <div className='click-next' onClick={this.onNext}>
                <span className='bryan icon-next' />
              </div>
            }
          </div>
        </div>
      </div>);
  }
}

interface ProjectsState {
  currentProjectCount: number;
}

export default Projects;
