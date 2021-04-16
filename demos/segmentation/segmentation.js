import * as THREE from "/node_modules/three/build/three.module";
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
import * as dat from "/node_modules/dat.gui/build/dat.gui.module";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const loader = new THREE.TextureLoader();
const texture = loader.load('./assets/tree.jpg');
const treeHeight = loader.load('../assets/treeDisplacement.jpg');

// Objects
const planeGeo = new THREE.PlaneBufferGeometry(3, 3, 100, 100);
// planeGeo.heightSegments = 100
// planeGeo.widthSegments = 20

// Materials
const planeMat = new THREE.MeshStandardMaterial({
  map: texture,
  wireframe: true,
  displacementMap: treeHeight,
  displacementScale: .2,
  // transparent: true,
  // depthTest: false,
});

// Mesh
const plane = new THREE.Mesh(planeGeo, planeMat);
// plane.rotation.x = -1.3
scene.add(plane);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.8);
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

// Debug
// const gui = new dat.GUI();
gui.add(plane.rotation, 'x').min(-3.0).max(3.0);
gui.add(pointLight.position, 'x').min(-10).max(10);
gui.add(pointLight.position, 'y').min(-10).max(30);
gui.add(pointLight.position, 'z').min(-10).max(30);


// Segment Adjustor
let planeData = {
  height: 3,
  width: 3,
  heightSegments: 1,
  widthSegments: 1,
}
const planePropertiesFolder = gui.addFolder('PlaneGeometry');
planePropertiesFolder.add(planeData, 'widthSegments', 1, 360);
planePropertiesFolder.add(planeData, 'heightSegments', 1, 360);


const regeneratePlaneGeo = () => {
  // let newGeo
}






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
