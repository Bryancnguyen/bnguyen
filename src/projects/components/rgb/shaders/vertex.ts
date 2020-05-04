export const vertexShader = () => {
  return `
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
  `;
};
