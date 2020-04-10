import { ObjectLoader, Object3D } from 'three';

export class Desk {
  constructor(private addSceneNode: (obj: Object3D) => void) {

  }

  public createDesk() {
    const loader = new ObjectLoader();
    loader.load(require('./source/computerDesk.obj'), (obj: Object3D) => this.onLoad(obj));
  }

  private onLoad(obj: Object3D) {
    this.addSceneNode(obj);
  }
}

export default Desk;