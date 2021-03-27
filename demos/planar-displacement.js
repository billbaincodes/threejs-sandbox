console.log("become one with inner selfness");

// import './style.css'
import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"
import * as dat from "../node_modules/dat.gui/build/dat.gui.module.js";

// Textures
const loader = new THREE.TextureLoader();
const texture = loader.load('./assets/mtntexture.jpeg');
const height = loader.load('./assets/height.png');
const alpha = loader.load('./assets/alpha3.png');

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const planeGeo = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials
const planeMat = new THREE.MeshStandardMaterial({
  color: 'gray',
  map: texture,
  displacementMap: height,
  displacementScale: .8,
  alphaMap: alpha,
  transparent: true,
  depthTest: false,
});

// Mesh
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -1.3
scene.add(plane);


// Lights
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.x = 1;
pointLight.position.y = 6;
pointLight.position.z = 3;
pointLight.color.set(0xff00);
scene.add(pointLight);

// Sizes
const sizes = {
  width: window.innerWidth * .75,
  height: window.innerHeight,
};

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = .6;
camera.position.z = 1.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Debug
// const gui = new dat.GUI();
// gui.add(plane.rotation, 'x').min(-3.0).max(3.0);
// gui.add(plane.displacementScale).min(-3.0).max(3.0);
// gui.add(pointLight.position, 'x').min(-10).max(10);
// gui.add(pointLight.position, 'y').min(-10).max(30);
// gui.add(pointLight.position, 'z').min(-10).max(30);
// maybe doesn't play well with GUI?
// const col = new THREE.Color( 0xff0000 );
// const col = { color: 0xff69 };
// gui.addColor(col, 'color').onChange(() => {
//   pointLight.color.set(col.color);
// })

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  plane.rotation.z = 0.2 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
