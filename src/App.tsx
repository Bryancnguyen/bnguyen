import React from 'react';
import './index.scss';
import './App.scss';
import LeftColumn from './left-column/LeftColumn';
import Projects from './projects/Projects';
import WorkExp from './work-exp/WorkExp';
import About from './about/About';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <div className='column'>
          <LeftColumn/>
          <WorkExp />
        </div>
        <div className='column'>
          <Projects/>
          <About/>
        </div>
      </div>
    </div>
  );
}

export default App;
