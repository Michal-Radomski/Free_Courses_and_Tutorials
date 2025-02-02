#version 330 core // Specify the GLSL version

layout(location = 0) in vec3 position; // Input vertex position

void main() {
    gl_Position = vec4(position, 1.0); // Set the vertex position
}


#version 330 core // Specify the GLSL version

out vec4 fragColor; // Output color of the fragment

void main() {
    fragColor = vec4(0.0, 0.58, 0.86, 1.0); // Set the fragment color (light blue)
}

#version 330 core // Specify the GLSL version

layout(location = 0) in vec3 position; // Input vertex position

void main() {
    gl_Position = vec4(position, 1.0); // Set the vertex position
}


#version 330 core // Specify the GLSL version

out vec4 fragColor; // Output color of the fragment

void main() {
    fragColor = vec4(0.0, 0.58, 0.86, 1.0); // Set the fragment color (light blue)
}


#version 330 core // Specify the GLSL version

layout(location = 0) in vec3 position; // Input vertex position

void main() {
    gl_Position = vec4(position, 1.0); // Set the vertex position
}


#version 330 core // Specify the GLSL version

out vec4 fragColor; // Output color of the fragment

void main() {
    fragColor = vec4(0.0, 0.58, 0.86, 1.0); // Set the fragment color (light blue)
}
