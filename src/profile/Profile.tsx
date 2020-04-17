import React from 'react';
import './profile.scss';
import ProfilePic from './profile-pic/ProfilePic';
import Name from './name/Name';
import Description from './description/Description';
import Location from './location/Location';
import ContactInfo from './contact-info/ContactInfo';
import Resume from './resume/resume';
import Panel from '../panel/Panel';
import About from './about/About';

class Profile extends React.Component<{}, ProfileState> {
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
      <div id='profile'>
        <Panel>
          <div className='profile-container'>
            <ProfilePic profileAlt={this.state.profileAlt} profileSrc={this.state.profileSrc}/>
            <Name name={this.state.name}/>
            <Description description={this.state.description}/>
            <Location location={this.state.location}/>
            <ContactInfo contactInfo={this.state.contactInfo}/>
            <Resume />
          </div>
          <div className='aboutme-container'>
            <About/>
          </div>
        </Panel>
      </div>
    )
  }

  componentDidMount() {
  }
}

interface ProfileState {
  profileAlt: string;
  profileSrc: string;
  name: string;
  description: string;
  location: string;
  contactInfo: string;
}

export default Profile;
