import * as THREE from 'three/build/three.module.js';

const SUPPORT_HD_DPI = true;

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeShape(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    shape.position.x = x;

    return shape;
  }

  const cubes = [
    makeShape(geometry, 0x44aa88, 0),
    makeShape(geometry, 0x8844aa, -2),
    makeShape(geometry, 0xaa8844, 2),
  ];

  function updateCanvasAspectRatio() {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = SUPPORT_HD_DPI ? window.devicePixelRatio : 1;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) renderer.setSize(width, height, false);

    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) updateCanvasAspectRatio();

    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1;
      const rotation = time * speed;

      cube.rotation.x = rotation;
      cube.rotation.y = rotation;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
