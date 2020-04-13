import React from 'react';
import './profilePic.scss';

class ProfilePic extends React.Component<ProfilePicProps, {}> {
  constructor(props: ProfilePicProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div id='profile-pic'>
      <img alt={this.props.profileAlt} src={`${process.env.PUBLIC_URL}/images/${this.props.profileSrc}`}/>
    </div>);
  }
}

interface ProfilePicProps {
  profileAlt: string;
  profileSrc: string;
}

export default ProfilePic;
