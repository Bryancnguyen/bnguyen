import React from 'react';
import './about.scss';

class About extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    </div>);
  }
}

export default About;
