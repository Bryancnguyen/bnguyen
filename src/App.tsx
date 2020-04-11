import React from 'react';
import './index.scss';
import './App.scss';
import LeftColumn from './left-column/LeftColumn';
import Projects from './projects/Projects';
import Skills from './skills/Skills';

function App() {
  return (
    <div className="App">
      <div className='row'>
        <div className='column'>
          <LeftColumn/>
          <Skills />
        </div>
        <div className='column'>
          <Projects/>
        </div>
      </div>
    </div>
  );
}

export default App;
