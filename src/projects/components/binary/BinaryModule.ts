import { Object3D, Material, BufferGeometry } from "three";
import ComponentType from "../ComponentType";

export class BinaryModule implements ComponentType {
  public readonly name = "binary";
  private binary: Object3D;
  private geometries: BufferGeometry[] = [];
  private materials: Material[] = [];

  constructor() {
    this.binary = new Object3D();
  }

  public addToBinary = (obj: Object3D) => {
    this.binary.add(obj);
  };

  public get container() {
    return this.binary;
  }

  public update() {
    this.binary.rotation.y += 0.009;
  }

  public dispose() {
    this.geometries.forEach((geometry) => {
      geometry.dispose();
    });
    this.materials.forEach((material) => {
      material.dispose();
    });
  }
}

export default BinaryModule;
