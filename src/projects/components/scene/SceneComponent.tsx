import React from 'react';
import SceneCore from './SceneCore';
import './scene.scss';
class SceneComponent extends React.Component<SceneComponentProps, {}> {
  private sceneCore: SceneCore | null = null;

  constructor(props: SceneComponentProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div id='canvas'/>)
  }

  public componentDidUpdate(nextProps: SceneComponentProps) {
    if (nextProps.currentProject === this.props.currentProject) return;
    this.updateSlideDirection();
  }

  private updateSlideDirection() {
    if (!this.sceneCore) return;
    this.sceneCore.updateProject(this.props.currentProject);
  }

  public componentDidMount() {
    const canvas = document.getElementById('canvas')!;
    this.sceneCore = new SceneCore(canvas);
    this.sceneCore.init();
    this.sceneCore.animate();
  }
}

interface SceneComponentProps {
  slideDirection: string;
  currentProject: string;
}

export default SceneComponent;
