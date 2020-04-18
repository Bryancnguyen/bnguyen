import React from 'react';
import SceneCore from './SceneCore';
import './scene.scss';
class SceneComponent extends React.Component<SceneComponentProps, {}> {
  private sceneCore: SceneCore | null = null;

  constructor(props: SceneComponentProps) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {
    const canvas = document.getElementById('canvas')!;
    this.sceneCore = new SceneCore(canvas);
    console.log(this.props.currentProject);
    this.sceneCore.init(this.props.currentProject);
    this.sceneCore.animate();
    if (this.sceneCore) {
      // resize the canvas when the window size has changed
      window.addEventListener('resize', this.sceneCore.handleResize, false);
    }
  }

  public componentWillUnmount() {
    if (this.sceneCore) {
      window.removeEventListener('resize', this.sceneCore.handleResize, false);
      this.sceneCore.dispose();
    }
  }

  render() {
    return (<div id='canvas'/>)
  }

  public componentDidUpdate(nextProps: SceneComponentProps) {
    if (nextProps.currentProject !== this.props.currentProject) {
      this.updateProject(this.props.currentProject);
    }
  }

  private updateProject(project: string) {
    if (!this.sceneCore) return;
    this.sceneCore.updateProject(project);
  }
}

interface SceneComponentProps {
  currentProject: string;
}

export default SceneComponent;
