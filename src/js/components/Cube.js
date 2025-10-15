import styleImports from "/src/css/imports.css?inline";
// import styleComponent from "/src/css/components/.css?inline";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Cube extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });
  }

  connectedCallback() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Scene + Camera + Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Size
    renderer.setSize(w, h);
    this.shadowRoot.appendChild(renderer.domElement);

    // Ambient Light + Directional Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    ambientLight.position.set(5, 10, 5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 3);
    scene.add(ambientLight, directionalLight);

    // Geometry + Material (Mesh)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xeeffee });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    renderer.render(scene, camera);
  }

  disconnectedCallback() {
    renderer.dispose();
  }
}

export default Cube;
