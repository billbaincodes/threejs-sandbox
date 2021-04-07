// import './style.css'
import * as THREE from "/node_modules/three/build/three.module.js";
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GeometryUtils } from "/node_modules/three/examples/jsm/utils/GeometryUtils.js";
import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const points = GeometryUtils.gosper( 8 );
const geometry = new THREE.BufferGeometry();
const positionAttribute = new THREE.Float32BufferAttribute( points, 3 );
// draw range
let drawCount = 200; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );
geometry.setAttribute( 'position', positionAttribute );
geometry.center();

const material = new THREE.LineBasicMaterial( );

let line = new THREE.Line( geometry, material );
line.scale.setScalar( 0.005 );
scene.add( line );

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Sizes
const sizes = {
  width: window.innerWidth,
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
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  geometry.setDrawRange( 0, elapsedTime*40 );

  // Update objects
  // sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
