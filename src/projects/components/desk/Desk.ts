import { Object3D } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export class Desk {
  constructor(private addSceneNode: (obj: Object3D) => void) {}

  public createDesk() {
    const loader = new GLTFLoader();
    loader.load(`${process.env.PUBLIC_URL}/assets/desk/scene.gltf`, (obj: GLTF) => this.onLoad(obj));
  }

  private onLoad(obj: GLTF) {
    obj.scene.position.x = 1000;
    obj.scene.position.y = 650;
    obj.scene.rotation.x = - Math.PI / 2;
    obj.scene.rotation.z = - Math.PI;
    obj.scene.rotation.y = - Math.PI / 2;
    obj.scene.scale.set(2.2, 2.2, 2.2);
    this.addSceneNode(obj.scene);
  }
}

export default Desk;