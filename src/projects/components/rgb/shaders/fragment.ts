export const fragmentShader = () => {
  return `
    // referenced from https://www.shadertoy.com/view/3dlBRB
    precision mediump float;
    varying vec2 vUv;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float theta;

    void main() {
      float time = iTime;

      float c = cos(theta);
      float s = sin(theta);
    
      mat2 rot = mat2(c, s, -s, c);

      vec2 vU = vUv;
	    vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy - 1.0) / iResolution.y * rot;

      float d = max(abs(p.x * 2.0) + (p.y * 1.2), abs(p.y * 1.0)) - 1.0;
      vec3 uv = vec3(0.0, 0.0, 0.0);

      uv = mix(uv, vec3(1.0), smoothstep(.04, .04, abs(d)));
      uv = mix(uv, vec3(1.0, 0.0, 0.0), fract(d) / sqrt(d*9.));
      
      //get the colour
      float xCol = (uv.x - (time / 8.0)) * 3.0;
      xCol = mod(xCol, 3.0);
      vec3 horColour = vec3(0.25, 0.25, 0.25);
      
      if (xCol < 1.0) {
        
        horColour.r += 1.0 - xCol;
        horColour.g += xCol;
      }
      else if (xCol < 2.0) {
        
        xCol -= 1.0;
        horColour.g += 1.0 - xCol;
        horColour.b += xCol;
      }
      else {
        
        xCol -= 2.0;
        horColour.b += 1.0 - xCol;
        horColour.r += xCol;
      }
      
      //background lines
      float backValue = 1.0;
      float aspect = iResolution.x / iResolution.y;
      if (mod(uv.y * 100.0, 1.0) > 0.75 || mod(uv.x * 100.0 * aspect, 1.0) > 0.75) {
        
        backValue = 1.15;	
      }
      
      vec3 backLines  = vec3(backValue);
      
      // main beam
      uv = (2.0 * uv) - 1.0;
      float beamWidth = abs(1.0 / (30.0 * uv.y));
      vec3 horBeam = vec3(beamWidth);
      
      gl_FragColor = vec4(((backLines * horBeam) * horColour), 1.0);
  }
`;
};
