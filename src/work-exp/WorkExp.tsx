import React from 'react';
import './workExp.scss';
import Panel from '../panel/Panel';
import Pie from './pie/Pie';
import Modal from '../modal/Modal';
import ExpBar from './exp-bar/ExpBar';

class WorkExp extends React.Component<{}, WorkExpState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  private onPieClicked = () => {
    this.setState({openModal: true});
  }

  private calculatePercentage(months: number) {
    const totalMonths = 70;
    const monthPercentage = (months / totalMonths) * 100;
    return monthPercentage;
  }

  render() {
    const matterportExp = this.calculatePercentage(22);
    return (
    <div id='work-exp'>
      <Panel title={'Work Experience'}>
        <Pie onClick={this.onPieClicked}/>
        <Modal>
          <div className='header'>Matterport</div>
          <div className='sub-header'>Software Engineer</div>
          <ExpBar text={'1 Year 10 Months'} color={'#ff8db1'} percentage={matterportExp}/>
          <p>
            As a Software Engineer at Matteport, I worked on researching and creating new user experiences within Showcase and Workshop <br/>
            Showcase was a viewer for the a 3D model that a user could interact with and could be embed within webpages<br/>
            Workshop was an editor that allowed model owners to edit how a model would be presented to the viewer
          </p>
          <iframe title='matterport' allow="vr" height="480" width="700" src="https://my.matterport.com/show/?m=f6dv1vRds4q" id="iFrameResizer0"
            scrolling="no"></iframe>
          <div className='header'>Matterport</div>
          <div className='sub-header'>Software Engineer</div>
          <ExpBar text={'1 Year 10 Months'} color={'#ff8db1'} percentage={matterportExp}/>
          <p>
            As a Software Engineer at Matteport, I worked on researching and creating new user experiences within Showcase and Workshop <br/>
            Showcase was a viewer for the a 3D model that a user could interact with and could be embed within webpages<br/>
            Workshop was an editor that allowed model owners to edit how a model would be presented to the viewer
          </p>
        </Modal>
      </Panel>
    </div>);
  }
}

interface WorkExpState {
  openModal: boolean;
}

export default WorkExp;
