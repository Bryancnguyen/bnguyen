import { SphereGeometry, MeshPhongMaterial, Mesh, Vector3, Object3D, PointLight, AmbientLight, Geometry, Material } from 'three';
import ComponentType from '../ComponentType';

export default class Moist implements ComponentType {
  public readonly name = 'moist';
  private moist: Object3D = new Object3D();
  private geometry: SphereGeometry;
  private waterGeometry: SphereGeometry;
  private material: MeshPhongMaterial;
  private material2: MeshPhongMaterial;
  private geometries: Geometry[] = [];
  private materials: Material[] = [];
  private tempVect = new Vector3();

  constructor() {
    this.geometry = new SphereGeometry(64, 32, 32);
    this.waterGeometry = new SphereGeometry(40, 20, 20);

    this.material = new MeshPhongMaterial({
      color: '#F00000',
    });
    this.material2 = new MeshPhongMaterial({
      color: '#FFFFFF',
    });

    this.geometries.push(this.geometry);
    this.materials.push(this.material, this.material2);

    this.moist.add(...this.createMoistComponent());
    this.addLight();
  }

  public get container() {
    return this.moist;
  }

  private createMoistComponent() {
    const spheres: Object3D[] = [];

    for (let i = 0; i < 2000; i++) {
      const root = new Object3D();
      root.position.copy(this.calcPosition());

      const hydro = new Mesh(this.geometry, this.material);
      const agua1 = new Mesh(this.waterGeometry, this.material2);
      const agua2 = new Mesh(this.waterGeometry, this.material2);

      agua1.position.set(40, -40, 5);
      agua2.position.set(-40, -40, 5);


      root.rotation.x = (Math.random() * 360) * Math.PI / 180;
      root.rotation.y = (Math.random() * 360) * Math.PI / 180;
      root.rotation.z = (Math.random() * 360) * Math.PI / 180;
      root.add(hydro, agua1, agua2);

      spheres.push(root);
    }
    return spheres;
  }

  private addLight() {
    const light = new PointLight(0xffffff, 1, 10000);
    light.position.set(5000, 5000, 5000);
    const light_two = new PointLight(0xffffff, 1, 4000);
    light_two.position.set(-1000, 8000, 8000);
    const lightAmbient = new AmbientLight(0x404040);

    this.moist.add(light, light_two, lightAmbient);
  }

  private calcPosition() {
    this.tempVect.set(
      (Math.random() - 0.5) * 5000,
      (Math.random() - 0.5) * 5000,
      (Math.random() - 0.5) * 5000,
    )
    return this.tempVect;
  }

  public dispose() {
    this.geometries.forEach((geometry) => {
      geometry.dispose();
    })
    this.materials.forEach((material) => {
      material.dispose();
    })
  }

  public update() {
    const timer = 0.0002 * Date.now();
    for ( let i = 0, il = this.moist.children.length; i < il; i ++ ) {

    const sphere = this.moist.children[ i ];
    sphere.updateMatrixWorld();

    sphere.position.x = 1000 * Math.cos( timer + i );
    sphere.position.y = 1000 * Math.sin( timer + i * 1.1 );
    sphere.rotation.x += Math.random() * 0.05;
    sphere.rotation.y += Math.random() * 0.05;
    }
  }
}