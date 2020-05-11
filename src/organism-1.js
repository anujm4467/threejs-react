import * as THREE from '@three';
import { OrbitControls } from '@three-controls/OrbitControls.js';
import { GUI } from '@three-gui';

import {
  resizeRendererToDisplaySize,
  updateCanvasAspectRatio,
} from '@helpers/responsiveCanvas';

import { scene as newScene } from '@factories/sceneFactory';

import { perspectiveCamera } from '@factories/cameraFactory';
import { cameraGui } from '@helpers/gui/cameraGui';

import {
  pointLight,
  ambientLight,
  directionalLight,
} from '@factories/lightFactory';
import { pointLightGui, ambientLightGui } from '@helpers/gui/lightGui';

import '@styles/index.css';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = newScene();

  renderer.physicallyCorrectLights = true;

  const camera = perspectiveCamera();
  camera.position.set(0, 100, 40);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const ambLight = ambientLight();
  scene.add(ambLight);

  const lightPositions = [
    [30, 0, 0],
    [-30, 0, 0],
    [0, 0, 30],
    [0, 0, -30],
    [0, 30, 0],
    [0, -30, 0],
  ];

  lightPositions.forEach((position) => {
    const light = directionalLight();
    light.position.set(...position);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
  });

  // const gui = new GUI();
  // cameraGui({ gui, camera });
  // ambientLightGui({ gui, light: ambLight });

  let objects = makeObjects();
  scene.add(...objects);

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer))
      updateCanvasAspectRatio(renderer, camera);

    objects.forEach((object) => object.animate(time));

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

function makeObjects(count = 10) {
  const objects = [];
  const rotationSpeed = 100;

  for (let i = 0; i < count; i++) {
    const innerRadius = 1 + i * 1.5;
    const outerRadius = innerRadius + 0.1;
    const thetaSegments = 50;

    const geometry = new THREE.RingBufferGeometry(
      innerRadius,
      outerRadius,
      thetaSegments
    );

    const material = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.movingDown = true;
    mesh.speed = 0.001 * i + 0.05;

    mesh.animate = (time) => {
      if (
        (mesh.movingDown && mesh.position.z > count * 1.5) ||
        (!mesh.movingDown && mesh.position.z < -count * 1.5)
      ) {
        mesh.movingDown = !mesh.movingDown;
        mesh.speed *= -1;
      }
      mesh.rotation.x = mesh.speed * mesh.speed * time * rotationSpeed;
      mesh.rotation.y = mesh.speed * mesh.speed * time * rotationSpeed;
      mesh.position.z += mesh.speed;
    };

    objects.push(mesh);
  }

  return objects;
}