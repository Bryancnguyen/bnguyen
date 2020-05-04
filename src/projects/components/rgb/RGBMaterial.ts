import { ShaderMaterial } from "three";
import shader from "./shader";
export default class RGBMaterial extends ShaderMaterial {
  constructor(width: number, height: number) {
    shader.rgb.uniforms.iResolution.value.x = width;
    shader.rgb.uniforms.iResolution.value.y = height;
    super({
      fragmentShader: shader.rgb.fragmentShader,
      vertexShader: shader.rgb.vertexShader,
      uniforms: shader.rgb.uniforms,
      name: "RGBMaterial",
    });
  }
}
