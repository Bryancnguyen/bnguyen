import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Object3D,
  Camera,
  SpotLight,
  DirectionalLight,
} from "three";
import MatterportLogo from "../matterport-logo/MatterportLogo";
import Boundaries from "../boundaries/Boundaries";
import ComponentType from "../ComponentType";
import Desk from "../desk/Desk";
import Bedroom from "../bedroom/Bedroom";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Moist from "../moist/Moist";
import Binary from "../binary/Binary";
import BinaryModule from "../binary/BinaryModule";

class SceneCore {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private components: ComponentType[] = [];
  private controls: OrbitControls | null = null;
  private canvasWidth: number = window.innerWidth;
  private canvasHeight: number = 500;
  private currentScene: string = "";
  private sceneProjects: string[] = [];
  private sceneObjMap: { [nodeName: string]: Object3D } = {};

  constructor(private canvas: HTMLElement) {
    // set up the scene
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      90,
      this.canvasWidth / this.canvasHeight,
      1,
      10000
    );
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
  }

  public init = (project: string) => {
    this.camera.position.set(0, 0, 2500);
    this.scene.add(this.camera);
    // set scene color
    this.scene.background = new Color(0x121212);
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);

    if (this.canvas) {
      this.canvas.appendChild(this.renderer.domElement);
    }
    this.activate(project);
  };

  /**
   * Resize function for when window size changes
   */
  public handleResize = () => {
    this.camera.aspect = window.innerWidth / this.canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, this.canvasHeight);
  };

  public updateProject(projectName: string) {
    if (!this.sceneProjects.includes(projectName)) {
      // if the project doesn't exist, it's probably because its not a threejs Project, so go ahead hide
      this.scene.visible = false;
    } else {
      this.scene.visible = true;
      // if the project does exist, find the object and update its visibility in our scene
      this.currentScene = projectName;
    }
  }

  private activate(project: string) {
    this.addSceneObjects(project);

    // create controls
    this.createControls(this.camera, this.renderer);
  }

  private addSceneObjects(project: string) {
    const binary = new BinaryModule();
    const moist = new Moist();
    const matterportLogo = new MatterportLogo();
    // Boundaries will contain the entire group of objects inside it! Hierarchy!
    const boundaries = new Boundaries();

    const matterportLogoLight = new DirectionalLight(0xffffff, 2.5);
    matterportLogoLight.position.copy(this.camera.position);
    matterportLogoLight.castShadow = true;
    matterportLogo.container.add(matterportLogoLight);

    const animalCrossLight = new SpotLight(0xfbeee4, 1.5);
    animalCrossLight.position.copy(this.camera.position);
    animalCrossLight.castShadow = true;
    boundaries.container.add(animalCrossLight);

    // TODO: why the hell do I have two ways for mapping
    // the names of the projects should match with the component name
    this.sceneProjects.push(
      binary.name,
      moist.name,
      matterportLogo.name,
      boundaries.name
    );

    this.addSceneNode(binary.container, binary.name);
    this.addSceneNode(moist.container, moist.name);
    this.addSceneNode(matterportLogo.container, matterportLogo.name);
    this.addSceneNode(boundaries.container, boundaries.name);

    // show the matterport logo as its the first project
    this.currentScene = !project ? binary.name : project;
    // lazy load third party content
    this.loadThirdPartyObjects(boundaries, binary);

    // must add components to get it into the update loop
    this.components = [binary, moist, matterportLogo, boundaries];
  }

  /**
   * Controls for moving the scene around
   * @param camera
   * @param renderer
   */
  private createControls(camera: Camera, renderer: WebGLRenderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  /**
   * These are objects that come from SketchFab that we have in our public dir
   * @param boundaries
   */
  private loadThirdPartyObjects(
    boundaries: Boundaries,
    binaryModule: BinaryModule
  ) {
    const desk = new Desk(boundaries.addToFloor);
    desk.createDesk();

    const bedroom = new Bedroom(boundaries.addToFloor);
    bedroom.createBedroom();

    const binary = new Binary(binaryModule.addToBinary);
    binary.createText();
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
  };

  /**
   * Function allow retrieval of camera
   */
  public getCamera() {
    return this.camera;
  }

  /**
   * Function to render the current scene with camera
   */
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

    // show and hide the current and not current projects
    for (let [key, value] of Object.entries(this.sceneObjMap)) {
      if (key === this.currentScene) {
        value.visible = true;
      } else {
        value.visible = false;
      }
    }
  };

  // free up memory
  public dispose = () => {
    this.components.forEach((c) => {
      c.dispose();
    });
  };
}

export default SceneCore;
