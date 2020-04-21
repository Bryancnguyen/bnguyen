import React, { useState } from 'react';
import './projects.scss';
import SceneComponent from './components/scene/SceneComponent';
import Pie from './pie/Pie';
import Modal from '../modal/Modal';
export enum ProjectTypes {
  TwoD,
  ThreeD
}

const projects = [{
  name: 'moist',
  type: ProjectTypes.ThreeD,
}, {
  name: 'matterport-logo',
  type: ProjectTypes.ThreeD,
}, {
  name: 'animal-crossing',
  type: ProjectTypes.ThreeD,
}, {
  name: 'pie',
  type: ProjectTypes.TwoD,
  project: <Pie circumference={100} total={81} viewSize={40} />
}
];

const projectsMap: { [key: number]: string } = {
  0: 'Moist',
  1: 'Matterport Logo',
  2: 'Animal Crossing in Three',
  3: 'Pie'
}

const getUIProject = (projectCount: number) => {
  const uiProject = projects[projectCount].project;
  return uiProject ? uiProject : null;
}

export const Projects = () => {

  const [projectCount, setProjectCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const currentProject = projects[projectCount];

  return (<div id='projects'>
    <div className='projects-container'>
      {
        currentProject.type === ProjectTypes.ThreeD &&
        <SceneComponent currentProject={currentProject.name} />
      }
      {
        currentProject.type === ProjectTypes.TwoD &&
        getUIProject(projectCount)
      }
      <div className='current-project'>
        {
          projectCount !== 0 &&
          <div className='click-prev' onClick={() => setProjectCount((c => c - 1))}>
            <span className='bryan icon-prev' />
          </div>
        }
        <span className='project-name'>{projectsMap[projectCount]}</span>
        {
          projectCount !== projects.length - 1 &&
          <div className='click-next' onClick={() => setProjectCount((c => c + 1))}>
            <span className='bryan icon-next' />
          </div>
        }
      </div>
    </div>
    {showModal && <Modal onClose={() => setShowModal(false)} />}
  </div>)
};

interface ProjectsState {
  currentProjectCount: number;
}

export default Projects;
