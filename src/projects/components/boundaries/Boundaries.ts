import { Object3D, Mesh, Vector3, MeshLambertMaterial, TextureLoader, sRGBEncoding, RepeatWrapping, PlaneBufferGeometry, DoubleSide, MeshBasicMaterial, BoxBufferGeometry } from 'three';
import ComponentType from '../ComponentType';

export class Boundaries implements ComponentType {
  public readonly name = 'animal-crossing';
  private boundaries: Object3D;
  private wallMaterial: MeshLambertMaterial;
  private materialTransparent: MeshBasicMaterial;
  private floorMaterial: MeshBasicMaterial;
  private floor: Object3D | null = null;
  constructor() {
    const loader = new TextureLoader();
    const floorTexture = loader.load(`${process.env.PUBLIC_URL}/assets/textures/a_flooring2.png`);
    floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
    floorTexture.repeat.set( 6, 6 );
    floorTexture.anisotropy = 16;
    floorTexture.encoding = sRGBEncoding;
    this.floorMaterial = new MeshLambertMaterial({
      map: floorTexture,
    });
    const wallTexture = loader.load(`${process.env.PUBLIC_URL}/assets/textures/wall5.jpg`);
    wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping;
    wallTexture.repeat.set( 2, 2 );
    wallTexture.anisotropy = 16;
    wallTexture.encoding = sRGBEncoding;
    this.wallMaterial = new MeshLambertMaterial({
      side: DoubleSide,
      map: wallTexture,
    });
    this.materialTransparent =  new MeshBasicMaterial( { transparent: true, opacity: 0, side: DoubleSide} );

    this.boundaries = this.createWalls();
  }

  private createWalls() {
    const root = new Object3D();
    const walls = this.createWallMeshes();
    this.positionWalls(walls);
    this.floor = this.createFloor();
    this.positionFloor(this.floor);
    walls.add(this.floor);
    root.add(walls);
    root.scale.copy(new Vector3(1, 1, 1));
    return root;
  }

  private createFloor() {
    const geometry = new PlaneBufferGeometry(3500, 2000);
    const mesh = new Mesh(geometry, this.floorMaterial);
    mesh.receiveShadow = true;
    return mesh;
  }

  private createWallMeshes() {
    const geometry = new BoxBufferGeometry(3500, 2000, 1500);
    const mesh = new Mesh(geometry, [this.wallMaterial, this.wallMaterial,
      this.wallMaterial, this.materialTransparent, this.materialTransparent, this.materialTransparent]);
    mesh.receiveShadow = true;
    return mesh;
  }

  public addToFloor = (obj: Object3D) => {
    if (this.floor) {
      this.floor.add(obj);
    }
  }

  private positionWalls(mesh: Object3D) {
    mesh.position.y = - 350;
    mesh.rotation.x = - Math.PI / 4;
  }

  private positionFloor(mesh: Object3D) {
    mesh.position.z = - 750;
  }

  public get container() {
    return this.boundaries;
  }

  public update() {}
}

export default Boundaries;