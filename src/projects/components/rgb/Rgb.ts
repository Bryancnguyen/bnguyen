import { Object3D, PlaneBufferGeometry, Mesh, RawShaderMaterial } from "three";
import ComponentType from "../ComponentType";
import RGBMaterial from "./RGBMaterial";

export default class RGB implements ComponentType {
  public readonly name = "rgb";
  private rgb: Object3D = new Object3D();
  private material: RawShaderMaterial;
  private materials: RawShaderMaterial[] = [];
  private geometries: PlaneBufferGeometry[] = [];

  constructor(private getWidthHeight: () => { width: number; height: number }) {
    const geometry = new PlaneBufferGeometry(2, 2);
    const { width, height } = this.getWidthHeight();
    this.material = new RGBMaterial(width, height);

    const mesh = new Mesh(geometry, this.material);
    this.materials.push(this.material);
    this.geometries.push(geometry);
    this.rgb.add(mesh);
  }

  public get container() {
    return this.rgb;
  }

  public dispose() {
    this.materials.forEach((material) => {
      material.dispose();
    });
    this.geometries.forEach((geometry) => {
      geometry.dispose();
    });
  }

  public update(delta: number) {
    const { width, height } = this.getWidthHeight();
    this.material.uniforms["iResolution"].value.setX(width);
    this.material.uniforms["iResolution"].value.setY(height);
    this.material.uniforms["iTime"].value = delta / 1000;
    this.material.uniforms["theta"].value = delta * 0.001;
  }
}
