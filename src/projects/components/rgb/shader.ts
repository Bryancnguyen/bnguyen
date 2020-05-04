import { fragmentShader } from "./shaders/fragment";
import { vertexShader } from "./shaders/vertex";
import { Vector2 } from "three";

export default {
  rgb: {
    uniforms: {
      iResolution: { type: "v2", value: new Vector2(1500, 500) },
      iTime: { type: "f", value: 1.0 },
      theta: { type: "f", value: 0.0 },
    },

    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  },
};
