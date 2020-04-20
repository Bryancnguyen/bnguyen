import React from 'react';
import './index.scss';
import './App.scss';
import { Profile } from './profile/Profile';
import Projects from './projects/Projects';
import WorkExp from './work-exp/WorkExp';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <Projects />
      </div>
      <div className='row'>
        <Profile />
      </div>
      <div className='row'>
        <WorkExp />
      </div>
    </div>
  );
}

export default App;
