
import { Scene, PerspectiveCamera, Color, WebGLRenderer, Object3D, Camera, SpotLight } from 'three';
// import MatterportLogo from '../matterport-logo/MatterportLogo';
import Boundaries from '../boundaries/Boundaries';
import ComponentType from '../ComponentType';
import Desk from '../desk/Desk';
import Bedroom from '../bedroom/Bedroom';

class SceneCore {
  private camera: Camera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private meshes: Object3D[] = [];
  private components: ComponentType[] = [];

  constructor(private canvas: HTMLElement) {
    // set up the scene
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public init = () => {
    this.camera.position.set( 0, 0, 2500 );
    this.scene.add(this.camera);
    const light = new SpotLight(0xFBEEE4, 1.5);
    light.position.copy(this.camera.position);
    light.castShadow = true;
    this.scene.add(light);
    // set scene color
    this.scene.background = new Color(0x000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.canvas) {
      this.canvas.appendChild(this.renderer.domElement);
    }

    // Boundaries will contain the entire group of objects inside it! Hierarchy!
    const boundaries = new Boundaries(this.camera);
    // static content
    // const matterportLogo = new MatterportLogo();
    // matterportLogo.container.position.set(0, 0, 600);
    // matterportLogo.container.rotation.x = -Math.PI / 1.5;
    // boundaries.addToFloor(matterportLogo.container);
    this.addSceneNode(boundaries.container);

    // lazy load content
    this.loadObjects(boundaries);

    // this.components = [matterportLogo];
  }

  private loadObjects(boundaries: Boundaries) {
    const desk = new Desk(boundaries.addToFloor);
    desk.createDesk();

    const bedroom = new Bedroom(boundaries.addToFloor);
    bedroom.createBedroom();
  }

  /**
   * Function to allow adding to scene
   * @param node 
   */
  public addSceneNode = (node: Object3D) => {
    this.scene.add(node);
  }

  /**
   * Function allow retrieval of camera
   */
  public getCamera() {
    return this.camera;
  }

  private renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Update loop for components and the scene
   */
  public animate = () => {
    requestAnimationFrame(this.animate);
    this.renderScene();
    this.components.forEach((c: ComponentType) => {
      c.update();
    });
  }
}

export default SceneCore;
