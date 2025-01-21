import './style.css';
import * as THREE from '../node_modules/three/build/three.module.js';

import { GLTFLoader } from '../node_modules/three/addons/loaders/GLTFLoader.js';
import { OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

///////////////////////////////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////////////////////////////

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

renderer.render(scene, camera);

///////////////////////////////////////////////////////////////////////////
// BACKGROUND
///////////////////////////////////////////////////////////////////////////

const spaceTexture = new THREE.TextureLoader().load('textures/space2-evendarker.jpg');
scene.background = spaceTexture;


///////////////////////////////////////////////////////////////////////////
// LIGHTING
///////////////////////////////////////////////////////////////////////////

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

///////////////////////////////////////////////////////////////////////////
// OBJECTS
///////////////////////////////////////////////////////////////////////////

//// EARTH ////////////////////////////////////////////////////////////////

const earthTexture = new THREE.TextureLoader().load('textures/earth2.jpg');

const earth = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({ map: earthTexture }));


earth.position.x = 0; earth.position.y = 0; earth.position.z = -12;

scene.add(earth);


//// ASTRONAUT ////////////////////////////////////////////////////////////

let loadedModel;
const loader = new GLTFLoader();

loader.load( 'models/Astronaut.glb', ( gltf ) => {
    loadedModel = gltf;
    gltf.scene.rotation.y = 4;
    gltf.scene.position.z = 14.75;
    gltf.scene.position.x = -16;

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// Astronaut by PW Wu [CC-BY] via Poly Pizza

//// LAPTOP ///////////////////////////////////////////////////////////////////

//Laptop by Poly by Google [CC-BY] via Poly Pizza

let laptopModel;

loader.load( 'models/Laptop.glb', ( gltf ) => {

  laptopModel = gltf;

  gltf.scene.rotation.x = 1;
  gltf.scene.position.z = -500;
  gltf.scene.position.x = -48;
  
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

//// MOON /////////////////////////////////////////////////////////////////

const moonTexture = new THREE.TextureLoader().load('textures/earth2.jpg');

const moon = new THREE.Mesh(new THREE.SphereGeometry(10, 40, 40), new THREE.MeshStandardMaterial({ map: moonTexture }));


moon.position.x = -59; moon.position.y = -10.1; moon.position.z = 55;

scene.add(moon);

///////////////////////////////////////////////////////////////////////////
// CAMERA MOVEMENT
///////////////////////////////////////////////////////////////////////////

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * 0.01;
}

document.body.onscroll = moveCamera

///////////////////////////////////////////////////////////////////////////
// ANIMATE
///////////////////////////////////////////////////////////////////////////

function animate() {
    requestAnimationFrame(animate);

    const t = document.body.getBoundingClientRect().top;

    if (loadedModel) {
      loadedModel.scene.rotation.y += -0.005;
      loadedModel.scene.rotation.z += -0.005;
    }

    if (laptopModel) {
      laptopModel.scene.rotation.y += -0.005;
      laptopModel.scene.rotation.z += -0.005;
      if (t < -4400 && t > -4900) {
        laptopModel.scene.position.x = camera.position.x - 3;
        if (laptopModel.scene.position.z < camera.position.z - 10)
          laptopModel.scene.position.z += 10;
        else
          laptopModel.scene.position.z = camera.position.z - 6;
      }
      else {
        if (laptopModel.scene.position.z > -500)
          laptopModel.scene.position.z -= 10;
      }
    }

    console.log(t);

    earth.rotation.y += 0.005;
    moon.position.x = camera.position.x;

    renderer.render(scene, camera);
}
  

animate();
