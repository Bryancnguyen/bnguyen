import React, { useState } from 'react';
import './profile.scss';
import Panel from '../panel/Panel';
import Button from '../button/Button';

export const Profile = () => {
  const [profile] = useState(() => ({
    profileAlt: 'bryan"/s profile pic',
    profileSrc: 'profile_pic.jpg',
    name: 'Bryan Nguyen',
    description: 'Software Engineer',
    location: 'San Jose, CA',
    contactInfo: 'bryan.canh@gmail.com'
  }));

  function onResumeBtnClick() {
    try {
      window.open('https://drive.google.com/file/d/1ZMauJyforXSWWJSHiUvXAQjt7THIvq8R/view?usp=sharing', '_blank');
    } catch (err) {
      console.error('Could not open resume link');
    }
  }

  return (
    <div id='profile'>
      <Panel>
        <div className='profile-container'>
          <div id='profile-pic'>
            <img alt={profile.profileAlt} src={`${process.env.PUBLIC_URL}/images/${profile.profileSrc}`} />
          </div>
          <div id='name'>
            <span>{profile.name}</span>
          </div>
          <div id='description'>
            <p>{profile.description}</p>
          </div>
          <div id='location'>
            <span className='bryan icon-location' />
            <span className='location'>{profile.location}</span>
          </div>
          <div id='contact-info'>
            <div>
              <a className='linkedin' href='https://www.linkedin.com/in/bryancnguyen/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
            </div>
            <div>
              <a className='github' href='https://github.com/Bryancnguyen' target='_blank' rel='noopener noreferrer'>Github</a>
            </div>
            <div>
              <a className='email' href='mailto:bryan.canh@gmail.com'>{profile.contactInfo}</a>
            </div>
          </div>
          <div id='resume'>
            <Button text={'Resume'} onClick={onResumeBtnClick} />
          </div>
        </div>
        <div className='aboutme-container'>
          <div id='about'>
            <h1>Hello World</h1>
            <p>I am currently a Software Engineer specializing in Front End Web Development.
            I've been building visuals for the web my whole career and have worked with small and large scale projects
            both in a start up and mid-sized company.
      </p>
            <p>
              I enjoy consuming the vast number of libraries that encompass the world of Javascript
              and making small prototypes from each of them. I am currently building applications in ReactJS and applying ThreeJS to some of my
              personal projects.
      </p>
            <p>
              I am an aspiring engineer that continues to enjoy writing concise code and will not hesitate if a complex problem appears.
              Just feed me coffee and I'll code anything for you.
      </p>
          </div>
        </div>
      </Panel>
    </div>
  );
};
