import { Object3D, Mesh, Vector3, MeshLambertMaterial, TextureLoader, sRGBEncoding, RepeatWrapping, PlaneBufferGeometry, DoubleSide, MeshBasicMaterial, Camera, BoxBufferGeometry } from 'three';

export class Boundaries {
  private boundaries: Object3D;
  private wallMaterial: MeshLambertMaterial;
  private material: MeshBasicMaterial;
  private materialTransparent: MeshBasicMaterial;
  private floorMaterial: MeshBasicMaterial;
  private floor: Object3D | null = null;
  constructor(private camera: Camera) {
    const loader = new TextureLoader();
    const floorTexture = loader.load('assets/textures/a_flooring2.png');
    floorTexture.wrapS = floorTexture.wrapT = RepeatWrapping;
    floorTexture.repeat.set( 6, 6 );
    floorTexture.anisotropy = 16;
    floorTexture.encoding = sRGBEncoding;
    this.floorMaterial = new MeshLambertMaterial({
      map: floorTexture,
    });
    const wallTexture = loader.load('assets/textures/wall5.jpg');
    wallTexture.wrapS = wallTexture.wrapT = RepeatWrapping;
    wallTexture.repeat.set( 2, 2 );
    wallTexture.anisotropy = 16;
    wallTexture.encoding = sRGBEncoding;
    this.wallMaterial = new MeshLambertMaterial({
      side: DoubleSide,
      map: wallTexture,
    });
    this.material = new MeshLambertMaterial({
      color: 0xFF3158,
      // transparent: true,
      side: DoubleSide,
      opacity: 0.8,
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

    // create Entrance
    // const entrance = this.createEntrance();
    // root.add(entrance);

    root.add(walls);

    // floor.add(wall1);
    // floor.add(wall2);
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

  // private createEntrance() {
  //   const geometry = new PlaneBufferGeometry(500, 100);
  //   const mesh = new Mesh(geometry, [this.])
  // }

  public addToFloor = (obj: Object3D) => {
    if (this.floor) {
      this.floor.add(obj);
    }
  }

  private createFlatBox() {
    const geometry = new PlaneBufferGeometry(2000, 2000);
    const mesh = new Mesh(geometry, this.material);
    mesh.lookAt(this.camera.position);
    mesh.receiveShadow = true;
    return mesh;
  }

  private positionWalls(mesh: Object3D) {
    mesh.position.y = - 350;
    mesh.rotation.x = - Math.PI / 4;
  }

  private positionFloor(mesh: Object3D) {
    mesh.position.z = - 750;
    // mesh.position.y = 350;
  }

  public get container() {
    return this.boundaries;
  }
}

export default Boundaries;