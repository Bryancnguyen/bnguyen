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
    if (nextProps.currentProject === this.props.currentProject || nextProps.slideDirection === this.props.slideDirection) return;
    if (nextProps.slideDirection !== this.props.slideDirection) {
      this.updateSlideDirection();
    }
  }

  private updateSlideDirection() {
    if (!this.sceneCore) return;
    if (this.props.slideDirection === 'next') {
      this.sceneCore.next();
    } else if (this.props.slideDirection === 'prev') {
      this.sceneCore.prev();
    }
  }

  public componentDidMount() {
    const canvas = document.getElementById('canvas')!;
    this.sceneCore = new SceneCore(canvas, this.props.currentProject);
    this.sceneCore.init();
    this.sceneCore.animate();
  }
}

interface SceneComponentProps {
  slideDirection: string;
  currentProject: string;
}

export default SceneComponent;
