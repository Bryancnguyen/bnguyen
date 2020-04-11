import React from 'react';
import './leftColumn.scss';
import ProfilePic from './profile-pic/ProfilePic';
import Name from './name/Name';
import Description from './description/Description';
import Location from './location/Location';
import ContactInfo from './contact-info/ContactInfo';
import Resume from './resume/resume';
import Panel from '../panel/Panel';

class LeftColumn extends React.Component<{}, LeftColumnState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      profileAlt: 'bryan"/s profile pic',
      profileSrc: 'profile_pic.jpg',
      name: 'Bryan Nguyen',
      description: 'Software Engineer',
      location: 'San Jose, CA',
      contactInfo: 'bryancanhnguyen@gmail.com'
    };
  }

  render() {
    return (
      <div id='left-column'>
        <Panel>
          <div className='profile-container'>
            <ProfilePic profileAlt={this.state.profileAlt} profileSrc={this.state.profileSrc}/>
            <Name name={this.state.name}/>
            <Description description={this.state.description}/>
            <Location location={this.state.location}/>
            <ContactInfo contactInfo={this.state.contactInfo}/>
            <Resume />
          </div>
        </Panel>
      </div>
    )
  }

  componentDidMount() {
  }
}

interface LeftColumnState {
  profileAlt: string;
  profileSrc: string;
  name: string;
  description: string;
  location: string;
  contactInfo: string;
}

export default LeftColumn;
