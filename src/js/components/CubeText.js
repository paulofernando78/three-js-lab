// import cssImportsPath from "/src/css/imports.css?inline";
// import cssComponentPath from "/src/css/components/.css?inline";

import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";

class Cube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // [cssImportsPath, cssComponentPath].forEach((css) => {
    //   const style = document.createElement("style");
    //   style.textContent = css;
    //   this.shadowRoot.appendChild(style);
    // });
    
    const phraseList = [
      "Hi there!",
      "How are you doing?",
      "How's it going?",
      "What's up?",
      "How are you?",
      "How are you feeling?",
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    const container = document.getElementById("three-js-logo");
    container.appendChild(renderer.domElement);

    // CSS controls it
    renderer.setSize(container.clientWidth, container.clientHeight);

    function createTextTexture(text) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 512;
      canvas.height = 512;

      // Transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold 60px Poppins";
      ctx.fillStyle = "#00ffcc";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      return new THREE.CanvasTexture(canvas);
    }

    // Criar um metrial por face
    const materials = phraseList.map(
      (phrase) =>
        new THREE.MeshBasicMaterial({ map: createTextTexture(phrase) })
    );

    // Material compatible with light
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.y = 0.1;
    scene.add(cube);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);

    // Ambient light and directional
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    const directional = new THREE.DirectionalLight(0xffffff, 1);
    directional.position.set(2, 2, 3);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 1024;
    directional.shadow.mapSize.height = 1024;
    directional.shadow.camera.near = 1;
    directional.shadow.camera.far = 10;
    directional.shadow.camera.left = -2;
    directional.shadow.camera.right = 2;
    directional.shadow.camera.top = 2;
    directional.shadow.camera.bottom = -2;
    directional.shadow.radius = 15;
    directional.shadow.blurSamples = 16;

    scene.add(ambient, directional);

    camera.position.z = 1.5;

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.castShadow = true;

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  }
}

export default Cube;
