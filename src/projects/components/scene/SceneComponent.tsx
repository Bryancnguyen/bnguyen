import React from 'react';
import SceneCore from './SceneCore';
import './scene.scss';
class SceneComponent extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div id='canvas'/>)
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas')!;
    const sceneCore = new SceneCore(canvas);
    sceneCore.init();
    sceneCore.animate();
  }
}

export default SceneComponent;
