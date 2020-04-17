import { Object3D } from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export class Bedroom {
  constructor(private addSceneNode: (obj: Object3D) => void) {}

  public createBedroom() {
    const loader = new GLTFLoader();
    loader.load(`${process.env.PUBLIC_URL}/assets/bedroom/scene.gltf`, (obj: GLTF) => this.onLoad(obj));
  }

  private onLoad(obj: GLTF) {
    obj.scene.position.x = -800;
    obj.scene.position.z = 100;
    obj.scene.position.y = 800;
    obj.scene.rotation.x = - Math.PI / 2;
    obj.scene.rotation.z = - Math.PI;
    obj.scene.scale.set(13, 13, 13);
    this.addSceneNode(obj.scene);
  }
}

export default Bedroom;