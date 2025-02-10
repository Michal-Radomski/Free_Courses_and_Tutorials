import "./style.scss";

function main(): void {
  const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl") as WebGLRenderingContext;
  // console.log("gl:", gl);

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Define the vertices for a triangle
  const vertices: Float32Array<ArrayBuffer> = new Float32Array([0.0, 1.0, -1.0, -1.0, 1.0, -1.0]);

  // Create a buffer and put the vertices in it
  const vertexBuffer: WebGLBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Create and compile the vertex shader
  //* GLSL Shader Code
  const vertexShaderSource = `
      attribute vec2 coordinates;
      void main(void) {
          gl_Position = vec4(coordinates, 0.0, 1.0);
      }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  // Create and compile the fragment shader
  //* Fragment Shader
  const fragmentShaderSource = `
      void main(void) {
          gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0); // Orange color
      }
  `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Create a shader program and link shaders
  const shaderProgram: WebGLProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // Use the program
  gl.useProgram(shaderProgram);

  // Bind the buffer and set attributes
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  const coord: number = gl.getAttribLocation(shaderProgram, "coordinates");
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coord);

  // Draw the triangle
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;
