import {
  Object3D,
  FontLoader,
  TextGeometry,
  Mesh,
  Font,
  MeshNormalMaterial,
  Geometry,
  Material,
} from "three";
import { calcRandomPosition } from "../utils/calcRandomPosition";

export default class Binary {
  constructor(
    private addSceneNode: (obj: Object3D) => void,
    private addGeoAndMesh: (geo: Geometry[], materials: Material[]) => void
  ) {
    this.createText();
  }

  public createText() {
    let loader = new FontLoader();

    loader.load(
      `${process.env.PUBLIC_URL}/fonts/helvetiker_regular.typeface.json`,
      (font: Font) => this.onLoad(font)
    );
  }

  private onLoad(font: Font) {
    let geometries = [];

    let materials = [
      new MeshNormalMaterial({ flatShading: true }), // front
      new MeshNormalMaterial(), // side
    ];

    for (let i = 0; i < 100; i++) {
      let geometry = new TextGeometry(`${i % 2 === 0 ? "0" : "1"}`, {
        font: font,
        size: 500,
        height: 300,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      geometries.push(geometry);
      const mesh = new Mesh(geometry, materials);
      mesh.position.copy(calcRandomPosition());
      this.addSceneNode(mesh);
    }
    // TODO: oh this is ugly
    this.addGeoAndMesh(geometries, materials);
  }
}
