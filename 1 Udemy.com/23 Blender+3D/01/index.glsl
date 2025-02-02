attribute vec2 coordinates;
void main(void) {
   gl_Position = vec4(coordinates, 0.0, 1.0);
}

void main(void) {
   gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0); // Orange color
}
