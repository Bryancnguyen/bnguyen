import { Object3D, MeshPhongMaterial, DoubleSide, BoxGeometry, Mesh, Geometry, Vector3 } from 'three';
import { degreesToRadians } from '../utils/degreesToRadians';
import ComponentType from '../ComponentType';

export class MatterportLogo implements ComponentType {
  public readonly name = 'matterport-logo';
  private logo: Object3D;
  private tempGeometry: Mesh | null;
  private material: MeshPhongMaterial;
  private rotations = [
    { x: 25, y: -43.05, z: 0 },
  ];
  private positions = [
    { x: 0, y: 0, z: 0 },
  ];
  private LShapeGeometry = [
    { x: 1, y: 0, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 1, y: 3, z: 0 },
    { x: 1, y: 4, z: -0 },
    { x: 1, y: 4, z: -1 },
    { x: 1, y: 4, z: -2 },
    { x: 1, y: 4, z: -3 },
    // OPPOSITE SIDE
    { x: 0, y: 4, z: -3 },
    { x: -1, y: 4, z: -3 },
    { x: -2, y: 4, z: -3 },
    { x: -2, y: 3, z: -3 },
    { x: -2, y: 2, z: -3 },
    { x: -2, y: 1, z: -3 },
    { x: -2, y: 0, z: -3 },
    { x: -2, y: 0, z: -2 },
    { x: -2, y: 0, z: -1 },
    { x: -2, y: 0, z: 0 },
  ];

  constructor() {
    this.material = new MeshPhongMaterial({
      color: 0xFF3158,
      transparent: true,
      side: DoubleSide,
      reflectivity: 1,
      opacity: 0.8,
      specular: 0xFC7A8C,
    });
    this.logo = this.createMeshLogo();
    this.tempGeometry = null;
    this.logo.scale.copy(new Vector3(50, 50, 50));
  }

  public get container() {
    return this.logo;
  }

  /**
   * Construct Matterport Logo
   */
  private createMeshLogo = () => {
    const root = new Object3D();
    for (let i = 0; i < 1; i++) {
      const geometry = new BoxGeometry(5, 5, 5);
      for (let j = 0; j < this.LShapeGeometry.length; j++) {
        this.tempGeometry = new Mesh(new BoxGeometry(5, 5, 5));
        this.tempGeometry.position.x = 5 * this.LShapeGeometry[j].x;
        this.tempGeometry.position.y = 5 * this.LShapeGeometry[j].y;
        this.tempGeometry.position.z = i === 1 ? 5 * this.LShapeGeometry[j].z : -1 * (5 * this.LShapeGeometry[j].z);
        this.tempGeometry.updateMatrix();
        geometry.merge(this.tempGeometry.geometry as Geometry, this.tempGeometry.matrix);
      }
  
      const mesh = new Mesh(geometry, this.material);
  
      mesh.rotateX(degreesToRadians(this.rotations[i].x)); /// 180
      mesh.rotateY(degreesToRadians(this.rotations[i].y));
      mesh.rotateZ(degreesToRadians(this.rotations[i].z));
      mesh.position.x += this.positions[i].x;
      mesh.position.y += this.positions[i].y;
      mesh.position.z += this.positions[i].z;
  
  
      root.add(mesh);
    }
    return root;
  }

  public update() {
    this.logo.rotation.y -= 0.01;
  }
}

export default MatterportLogo;
