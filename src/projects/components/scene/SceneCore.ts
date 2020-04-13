
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
  private components: ComponentType[] = [];
  private controls: OrbitControls | null = null;
  private canvasWidth: number = 500;
  private canvasHeight: number = 500;
  private currentScene: string = '';
  private sceneProjects = ['matterport-logo', 'animal-crossing'];
  private sceneObjMap: {[nodeName: string]: Object3D} = {};

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

  public updateProject(projectName: string) {
    if (!this.sceneProjects.includes(projectName)) {
      // if the project doesn't exist, it's probably because its not a threejs Project, so go ahead hide
      this.scene.visible = false;
    } else {
      // if the project does exist, find the object and update its visibility in our scene
      this.currentScene = projectName;
    }
  }

  private activate() {
    // Boundaries will contain the entire group of objects inside it! Hierarchy!
    const boundaries = new Boundaries(this.camera);
    // static content
    const matterportLogo = new MatterportLogo();
 
    this.addSceneNode(matterportLogo.container, matterportLogo.name);
    this.addSceneNode(boundaries.container, boundaries.name);

    // show the matterport logo as its the first project
    this.currentScene = matterportLogo.name;

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
  public addSceneNode = (node: Object3D, componentName: string) => {
    // start out not visible
    node.visible = false;
    this.scene.add(node);
    this.sceneObjMap[componentName] = node;
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

    for (let [key, value] of Object.entries(this.sceneObjMap)) {
      if (key === this.currentScene) {
        value.visible = true;
      } else {
        value.visible = false;
      }
    }
  }
}

export default SceneCore;
