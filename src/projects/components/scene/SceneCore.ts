
import { Scene, PerspectiveCamera, Color, WebGLRenderer, Object3D, Camera, DirectionalLight } from 'three';
import MatterportLogo from '../matterport-logo/MatterportLogo';
import Boundaries from '../boundaries/Boundaries';
import ComponentType from '../ComponentType';
import Desk from '../desk/Desk';
import Bedroom from '../bedroom/Bedroom';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class SceneCore {
  private camera: Camera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private meshes: Object3D[] = [];
  private components: ComponentType[] = [];
  private controls: OrbitControls | null = null;
  private canvasWidth: number = 650;
  private canvasHeight: number = 650;

  constructor(private canvas: HTMLElement) {
    // set up the scene
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 90, this.canvasWidth / this.canvasHeight, 1, 10000 );
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
  }

  public init = () => {
    this.camera.position.set( 0, 0, 2500 );
    this.scene.add(this.camera);
    // const light = new SpotLight(0xFBEEE4, 1.5);
    const light = new DirectionalLight(0xFFFFFF, 2.5);
    light.position.copy(this.camera.position);
    light.castShadow = true;
    this.scene.add(light);
    // set scene color
    this.scene.background = new Color(0x121212);
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);

    if (this.canvas) {
      this.canvas.appendChild(this.renderer.domElement);
    }
    this.activate();
  }

  private activate() {
    // Boundaries will contain the entire group of objects inside it! Hierarchy!
    const boundaries = new Boundaries(this.camera);
    // static content
    const matterportLogo = new MatterportLogo();
    // matterportLogo.container.position.set(0, 0, 600);
    // matterportLogo.container.rotation.x = -Math.PI / 1.5;
    // boundaries.addToFloor(matterportLogo.container);
    this.addSceneNode(matterportLogo.container);
    // this.addSceneNode(boundaries.container);

    // create controls
    this.createControls(this.camera, this.renderer);

    // lazy load content
    this.loadObjects(boundaries);

    this.components = [matterportLogo];
  }

  private createControls(camera: Camera, renderer: WebGLRenderer) {
    this.controls = new OrbitControls( camera, renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    this.controls.screenSpacePanning = false;

    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;

    this.controls.maxPolarAngle = Math.PI / 2;
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
    // render scene
    this.renderScene();
    // update controls!
    if (this.controls) {
      this.controls.update();
    }
    // call each components individual update loop
    this.components.forEach((c: ComponentType) => {
      c.update();
    });
  }
}

export default SceneCore;
