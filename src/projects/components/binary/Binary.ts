import {
  Object3D,
  FontLoader,
  TextBufferGeometry,
  Mesh,
  Font,
  MeshNormalMaterial,
  Material,
} from "three";
import { calcRandomPosition } from "../utils/calcRandomPosition";

export default class Binary {
  constructor(
    private addSceneNode: (obj: Object3D) => void,
    private addGeoAndMesh: (
      geo: TextBufferGeometry[],
      materials: Material[]
    ) => void
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

  private createGeo(font: Font, text: string) {
    return new TextBufferGeometry(text, {
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
  }

  private onLoad(font: Font) {
    let geometries = [];

    let materials = [
      new MeshNormalMaterial({ flatShading: true }), // front
      new MeshNormalMaterial(), // side
    ];

    const zeroGeo = this.createGeo(font, "0");
    const oneGeo = this.createGeo(font, "1");
    geometries.push(zeroGeo, oneGeo);

    for (let i = 0; i < 1000; i++) {
      const mesh = new Mesh(i % 2 === 0 ? zeroGeo : oneGeo, materials);
      mesh.position.copy(calcRandomPosition(10000));
      this.addSceneNode(mesh);
    }
    // TODO: oh this is ugly
    this.addGeoAndMesh(geometries, materials);
  }
}
