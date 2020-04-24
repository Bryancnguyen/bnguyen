import {
  Object3D,
  FontLoader,
  TextGeometry,
  Mesh,
  Font,
  MeshLambertMaterial,
  MeshNormalMaterial,
} from "three";

export default class Binary {
  constructor(private addSceneNode: (obj: Object3D) => void) {
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
    let geometry = new TextGeometry("TODO: //", {
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

    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    let materials = [
      new MeshNormalMaterial({ flatShading: true }), // front
      new MeshLambertMaterial({ color: 0x00ff00 }), // side
    ];

    // this.geometries.push(geometry);
    // this.materials.push(...materials);
    this.addSceneNode(new Mesh(geometry, materials));
  }
}
