import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.scss";
import model from "./3D_model.glb";
// console.log("model:", model);

const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const loader: GLTFLoader = new GLTFLoader();

loader.load(
  model as string,
  function (gltf: GLTF) {
    // console.log("gltf:", gltf);
    // Add the loaded model to the scene
    scene.add(gltf.scene);

    // Optionally adjust the model's scale or position
    gltf.scene.scale.set(0.01, 0.01, 0.01); // Scale the model
    gltf.scene.position.y = 1; // Position it above the ground
  },
  undefined,
  function (error) {
    console.error(error); // Handle any errors during loading
  }
);

const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

function animate(): void {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
console.log("controls:", controls);
